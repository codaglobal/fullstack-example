export default class Movie {
    public _id: string;
    public title: string = '';
    public genre: string = '';
    public description: string = '';
    public createdAt: Date;
    public updatedAt: Date;
    public _v: number;

    constructor() {
        
    }
}