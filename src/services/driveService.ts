/**
 * Service to manage Google Drive storage for Greece Pet Food Vault.
 * Ensures:
 * 1. Root folder: 'Greece Pet Food Vault'
 * 2. Brand folder: '01_8in1', '01_Acana', etc.
 * 3. Standardized filename nomenclature:
 *    - Packaging Front: {Brand}_{FlavorSlug}_{PackageSize}_Front.jpg
 *    - Ingredients Panel: {Brand}_{FlavorSlug}_Ingredients.jpg
 * 4. Max 2 images per flavor.
 */

export interface DriveFolder {
  id: string;
  name: string;
}

export interface UploadResult {
  fileId: string;
  webViewLink: string;
  webContentLink?: string;
  alreadyExisted?: boolean;
}

/**
 * Ensures the root 'Greece Pet Food Vault' folder exists in user's Drive.
 */
export async function ensureVaultRootFolder(accessToken: string): Promise<string> {
  const query = encodeURIComponent("name = 'Greece Pet Food Vault' and mimeType = 'application/vnd.google-apps.folder' and trashed = false");
  const response = await fetch(`https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to search Drive: HTTP ${response.status}`);
  }

  const data = await response.json();
  if (data.files && data.files.length > 0) {
    return data.files[0].id;
  }

  // Create folder
  const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Greece Pet Food Vault',
      mimeType: 'application/vnd.google-apps.folder',
      description: 'Permanent vault for verified Greek dog food packaging and ingredients photos',
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to create root folder: HTTP ${createRes.status}`);
  }

  const created = await createRes.json();
  return created.id;
}

/**
 * Ensures a specific brand folder exists inside the vault.
 */
export async function ensureBrandFolder(
  accessToken: string,
  rootFolderId: string,
  brandFolderName: string
): Promise<string> {
  const cleanName = brandFolderName.replace(/'/g, "\\'");
  const query = encodeURIComponent(`name = '${cleanName}' and '${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`);
  
  const response = await fetch(`https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.ok) {
    const data = await response.json();
    if (data.files && data.files.length > 0) {
      return data.files[0].id;
    }
  }

  // Create brand subfolder
  const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: brandFolderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [rootFolderId],
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to create brand folder: HTTP ${createRes.status}`);
  }

  const created = await createRes.json();
  return created.id;
}

/**
 * Uploads an image URL to Google Drive via backend proxy (avoiding CORS and hotlinking restrictions).
 */
export async function uploadImageUrlToDrive(
  accessToken: string,
  folderId: string,
  imageUrl: string,
  fileName: string
): Promise<UploadResult> {
  const response = await fetch('/api/drive/upload-image-url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      folderId,
      imageUrl,
      fileName,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `Server failed to upload image to Drive: HTTP ${response.status}`);
  }

  return await response.json();
}

/**
 * Standardized filename generation helper.
 * 2 images max per flavor:
 * - Front: {Brand}_{FlavorSlug}_{PackageSize}_Front.jpg
 * - Ingredients: {Brand}_{FlavorSlug}_Ingredients.jpg
 */
export function generateDriveFileNames(
  brand: string,
  flavor: string,
  packageSize: string
): { frontFileName: string; ingredientsFileName: string } {
  const sanitize = (str: string) =>
    str
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '')
      .slice(0, 40);

  const bSlug = sanitize(brand);
  const fSlug = sanitize(flavor);
  const sSlug = sanitize(packageSize);

  return {
    frontFileName: `${bSlug}_${fSlug}_${sSlug}_Front.jpg`,
    ingredientsFileName: `${bSlug}_${fSlug}_Ingredients.jpg`,
  };
}
