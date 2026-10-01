import { config, fields, collection } from '@keystatic/core';

export default config({
  // Edit local files in dev, commit to GitHub in production
  storage: import.meta.env.PROD
    ? {
        kind: 'github',
        repo: 'nipunattri1/nipunattri1.github.io',
        branchPrefix: 'content/', // edits go to a branch, not straight to main
      }
    : { kind: 'local' },

  ui: {
    brand: { name: 'Archives' },
  },

  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/archives/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'publishedDate'],
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            validation: { length: { min: 1, max: 100 } },
          },
        }),
        description: fields.text({
          label: 'Description',
          description: 'Short summary used for SEO and post previews',
          multiline: true,
          validation: { length: { max: 200 } },
        }),
        publishedDate: fields.date({
          label: 'Published date',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Hide this post from the live site',
          defaultValue: false,
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        coverImage: fields.image({
          label: 'Cover image',
          directory: 'src/assets/images/archives',
          publicPath: '../../assets/images/archives/',
        }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'src/assets/images/archives',
              publicPath: '../../assets/images/archives/',
            },
          },
        }),
      },
    }),
  },
});