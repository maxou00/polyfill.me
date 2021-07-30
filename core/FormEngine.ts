import {Page} from "./Page";

export class FormEngine{
    public name: string;
    public locale: string = "fr_FR";
    public pages: Page[];

    constructor(){
        this.name = "";
        this.pages = [];
        this.locale = "fr_FR";
    }

    public get copy(){
        return new FormEngine()
            .setName(this.name)
            .setLocale(this.locale)
            .addPage(...this.pages)
    }

    private recomputeTitle(){
        if(this.pages.length === 1){
            let first = this.first;
            if(first && first.title){
                this.name = first.title;
            }
        }
    }

    public setName(name: string){
        this.name = name;
        return this;
    }

    public get first(){
        if(this.pages.length > 0){
            return this.pages[0];
        }
        return null;
    }

    public get last(){
        if(this.pages.length === 0){
            return null;
        }
        return this.pages[this.pages.length - 1];
    }

    public addPage(...Page: Page[]){
        this.pages.push(...Page);
        this.recomputeTitle();
        return this;
    }

    public removePage(id: string){
        this.pages = this.pages.filter((s) => s.key !== id);
        return this;
    }

    public updatePage(Page: Page){
        let index = this.pages.findIndex((sec) => sec.key === Page.key);
        if(index !==-1){
            this.pages[index] = Page;
        }
        this.recomputeTitle();
        return this;
    }

    public setLocale(locale: string){
        this.locale = locale;
        return this;
    }
}