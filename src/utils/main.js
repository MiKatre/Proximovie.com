export function slugify(slug) {
    if (!slug){
      return ''
    }
    return slug.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g,'-').replace(/[^\w-]+/g,'')
  }