namespace GeneralHelper {
    export function defaultTo <T> (obj: T, value: T){
        if(obj){
            return obj;
        }
        return value;
    }
}

export default GeneralHelper;