export class Downloader {
    static download(filePath, fileName) {
        let extension = filePath.substr(filePath.lastIndexOf('.') + 1);

        let a = document.createElement('a');
        a.href = filePath;
        a.target = '_blank';
        a.download = `${fileName}.${extension}`;

        a.click();
    }
}