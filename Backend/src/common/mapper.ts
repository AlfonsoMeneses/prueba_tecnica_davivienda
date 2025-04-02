
import { plainToClass, plainToInstance } from 'class-transformer';

export class Mapper {
    public static mapper<T>(cls: new () => T,object:any, excludeExtraneousValues:boolean = false): T{
        return plainToClass(cls, object,{excludeExtraneousValues});
    }
    public static mapperArray<T>(cls: new () => T, objects: any[], excludeExtraneousValues: boolean = false): T[] {
        return plainToInstance(cls, objects, { excludeExtraneousValues });
    }
}