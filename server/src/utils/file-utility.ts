import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

Injectable();

export class FileUtility {
  getFileSizeText(fileSizeInBytes: number): string {
    const BYTE_TO_KB = 1024;
    const KB_TO_MB = 1024;
    const MB_TO_GB = 1024;

    if (!Number.isFinite(fileSizeInBytes) || fileSizeInBytes < 0) {
      throw new Error('Invalid file size');
    }

    let size: string | number;
    let unit: string;

    if (fileSizeInBytes < BYTE_TO_KB) {
      size = fileSizeInBytes;
      unit = 'bytes';
    } else if (fileSizeInBytes < BYTE_TO_KB * KB_TO_MB) {
      size = (fileSizeInBytes / BYTE_TO_KB).toFixed(2);
      unit = 'KB';
    } else if (fileSizeInBytes < BYTE_TO_KB * KB_TO_MB * MB_TO_GB) {
      size = (fileSizeInBytes / BYTE_TO_KB / KB_TO_MB).toFixed(2);
      unit = 'MB';
    } else {
      size = (fileSizeInBytes / BYTE_TO_KB / KB_TO_MB / MB_TO_GB).toFixed(2);
      unit = 'GB';
    }

    return `${size} ${unit}`;
  }

  async folderStructure(
    metadata: any,
    locationHierarchy: { name: any }[],
  ): Promise<string> {
    const address = metadata.address;
    const conceptType = metadata.conceptName;
    const subjectType = metadata.subjectTypeName;
    const encounterType = metadata.encounterTypeName;
    const keys = locationHierarchy.map((index: { name: any }) => index.name);
    const jsonAddress = JSON.parse(address);
    const pathPartsArray = [];
    let val = '';
    for (const key of keys) {
      val = key.toString();
      if (jsonAddress[val]) {
        pathPartsArray.push(jsonAddress[val].replace('/', '-'));
      }
    }
    if (subjectType) {
      pathPartsArray.push(subjectType.replace('/', '-'));
    }
    if (encounterType) {
      pathPartsArray.push(encounterType.replace('/', '-'));
    }
    if (conceptType) {
      pathPartsArray.push(conceptType.replace('/', '-'));
    }
    const directoryPath = pathPartsArray.join('/');
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }
    return directoryPath;
  }
}
