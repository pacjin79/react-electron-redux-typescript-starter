declare namespace Formsy {
    
    interface IFormProps {
        onSuccess?: ()=>void;
        onError?: ()=>void;
        onSubmit?: ()=>void;
        className?: string;
    }

    interface IFormsyState {
        isValid: boolean;
    }

    interface IFormsyInstance extends React.ClassicComponent<IFormProps, {}>{
        getCurrentValues: () => any;
        submit: () => void;
        state: IFormsyState;
        isChanged: () => boolean;
        reset: (data:_.Dictionary<any>) => void;
    }
    type Form = React.ClassicComponent<IFormProps, {}>;
    var Form: React.ClassicComponentClass<IFormProps>;
}

declare module "formsy-react" {
    export = Formsy;
}
