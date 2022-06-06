const page = {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'This is the title for the page. Keep it short!',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'This is the path to the page: "andysbackyardultra.com/<slug>" -- Ideally, it is similar to the title!',
      options: {
        source: 'title',
        slugify: input =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      description: 'This will be displayed prominently on the page.',
      validation: Rule => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      description: 'This is what we see on the page!',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required(),
    },
  ],
};

export default page;
