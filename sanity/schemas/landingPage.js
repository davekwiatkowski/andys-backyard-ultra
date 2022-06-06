const landingPage = {
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
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

export default landingPage;
