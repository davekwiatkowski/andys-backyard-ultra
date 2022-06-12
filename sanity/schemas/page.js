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
      name: 'isLandingPage',
      title: 'Is landing page?',
      type: 'boolean',
      description: 'Is this the landing page? There should be only one!',
      hidden: ({ parent, value }) => !value && parent?.slug,
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'This is the path to the page: "andysbackyardultra.com/#/<slug>" -- Ideally, it is similar to the title!',
      options: {
        source: 'title',
        slugify: input =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      hidden: ({ parent, value }) => !value && parent?.isLandingPage,
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
