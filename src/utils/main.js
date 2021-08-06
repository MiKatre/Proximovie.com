export function slugify(slug) {
    if (!slug){
      return ''
    }
    return slug.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')
  }