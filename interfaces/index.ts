export interface Article 
{
    
    title: string;
    url: string;
    source: string;
}

//Ensuring type safety for information.
export interface Information {
    
    name: string;
    address: string;
    base?: string;

}
