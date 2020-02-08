export class Film {
	public id: number;
	public title: string;
	public year: number;
  	public description: string;
  	public photo: string;

  	constructor(id: number, title: string, year: number, desc: string, photo: string) {
	    this.id = id;
	    this.title = title;
	    this.description = desc;
	    this.year = year;
	    this.photo = photo;
	  }
}