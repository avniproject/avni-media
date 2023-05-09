import { FileSize } from "./file-size";
describe("FileSize", () => {
    
  let fileSize: FileSize;
  beforeEach(() => {
    fileSize = new FileSize();
  });

  describe("getFileSizeText", () => {
    it("should return '0 bytes' for fileSizeInBytes = 0", () => {
      expect(fileSize.getFileSizeText(0)).toEqual("0 bytes");
    });

    it("should return '1 bytes' for fileSizeInBytes = 1", () => {
      expect(fileSize.getFileSizeText(1)).toEqual("1 bytes");
    });

    it("should return '1.00 KB' for fileSizeInBytes = 1024", () => {
      expect(fileSize.getFileSizeText(1024)).toEqual("1.00 KB");
    });

    it("should return '1.50 MB' for fileSizeInBytes = 1572864", () => {
      expect(fileSize.getFileSizeText(1572864)).toEqual("1.50 MB");
    });

    it("should return '1.20 GB' for fileSizeInBytes = 1288490188", () => {
      expect(fileSize.getFileSizeText(1288490188)).toEqual("1.20 GB");
    });

    it("should throw an error for non-finite file sizes", () => {
      expect(() => fileSize.getFileSizeText(NaN)).toThrow("Invalid file size");
      expect(() => fileSize.getFileSizeText(Infinity)).toThrow("Invalid file size");
    });
  });
});

describe("FileSize", () => {
    describe("folderStructure", () => {
      it("should create directory path with metadata and location hierarchy", async () => {
        const fileSize = new FileSize();
        const metadata = {
          address: '{"Dist": "Mumbai", "state": "MH"}',
          conceptName: "testConcept",
          subjectTypeName: "testSubject",
          encounterTypeName: "testEncounter",
        };
        const locationHierarchy = [
          { name: "state" },
          { name: "Dist" },
        ];
        const expectedPath = "MH/Mumbai/testSubject/testEncounter/testConcept";
  
        const path = await fileSize.folderStructure(metadata, locationHierarchy);
  
        expect(path).toBe(expectedPath);
      });
    });
  });
