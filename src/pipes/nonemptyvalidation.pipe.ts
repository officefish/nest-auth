import { ArgumentMetadata, BadRequestException, ValidationPipe } from '@nestjs/common';

export class NonEmptyValidationPipe extends ValidationPipe {
    async transform(value: any, metadata: ArgumentMetadata) {
        const result = await super.transform(value, metadata);
        if (metadata.type === 'body' && result === null) {
            throw new BadRequestException('DTO should not be empty');
        }
        return result;
    }
}
