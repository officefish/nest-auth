import { Injectable } from '@nestjs/common';
import { FileElementResponse } from './dto/file-element.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FilesService {
    // async upload(@UploadedFile() file: Express.Multer.File) {}
    // async remove(@UploadedFile() file: Express.Multer.File) {}
    async saveFile(file: Express.Multer.File): Promise<FileElementResponse[]> {
        const dateFolder = format(new Date(), 'yyyy-MM-dd');

        const uploadFolder = `${path}/uploads/${dateFolder}`;

        await ensureDir(uploadFolder);
        const res: FileElementResponse[] = [];
        await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
        res.push({
            url: `/uploads/${dateFolder}/${file.originalname}`,
            name: file.originalname,
        });
        return res;
    }
}
