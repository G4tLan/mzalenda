export class Story {
  id: String;
  image: String;
  description: String;
  links: Array<String>;

  constructor(
    id: String,
    image: String,
    description: String,
    links: Array<String>
  ) {
    this.id = id;
    this.image = image;
    this.description = description;
    this.links = links;
  }
}

export class MonthData {
  id: String;
  stories: Array<Story>;
  name: String;
  year: number;

  constructor(id: String, name: String, year: number, stories: Array<Story>) {
    this.id = id;
    this.stories = stories;
    this.year = year;
    this.name = name;
  }
}

interface PollLink {
  id: string;
  link: string;
  social_media: string;
}

export class Nominee {
  id: string;
  pollLinks: Array<PollLink>;
  story: Story

  constructor(id: string, pollLinks: Array<PollLink>, story: Story) {
    this.id = id;
    this.pollLinks = pollLinks;
    this.story = story;
  }
}
