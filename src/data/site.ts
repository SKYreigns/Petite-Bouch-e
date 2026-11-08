export type Weekday =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export type CategoryId =
  | 'cruffins'
  | 'cookies'
  | 'tarts'
  | 'cakes'
  | 'bread'
  | 'cafe'
  | 'custom';

export interface DayHours {
  day: Weekday;
  open: string;
  close: string;
}

export interface BusinessInfo {
  name: string;
  fullName: string;
  tagline: string;
  shortDescription: string;
  established: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  phone: {
    display: string;
    href: string;
  };
  instagram: {
    handle: string;
    url: string;
  };
  mapsUrl: string;
  hours: DayHours[];
  hoursNote: string;
}

export interface MenuCategory {
  id: CategoryId;
  title: string;
  kicker: string;
  description: string;
  image: string;
  href: string;
}

export interface Product {
  slug: string;
  name: string;
  category: Exclude<CategoryId, 'custom'>;
  description: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

export const business: BusinessInfo = {
  name: 'Petite Bouchée',
  fullName: 'Petite Bouchée Patisserie',
  tagline: 'A Little Something to Love.',
  shortDescription:
    'A Toronto patisserie for morning pastries, seasonal tarts, Portuguese country bread and bespoke celebration cakes.',
  established: '2021',
  address: {
    street: '28 Sousa Mendes St',
    city: 'Toronto',
    region: 'ON',
    postalCode: 'M6P 0B2',
    country: 'Canada',
  },
  phone: {
    display: '+1 416-588-8882',
    href: '+14165888882',
  },
  instagram: {
    handle: '@petite__bouchee_patisserie',
    url: 'https://www.instagram.com/petite__bouchee_patisserie/',
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=28+Sousa+Mendes+St+Toronto+ON+M6P+0B2',
  hours: [
    { day: 'Monday', open: '12:00 pm', close: '7:00 pm' },
    { day: 'Tuesday', open: '10:00 am', close: '7:00 pm' },
    { day: 'Wednesday', open: '10:00 am', close: '7:00 pm' },
    { day: 'Thursday', open: '10:00 am', close: '7:00 pm' },
    { day: 'Friday', open: '10:00 am', close: '7:00 pm' },
    { day: 'Saturday', open: '10:00 am', close: '7:00 pm' },
    { day: 'Sunday', open: '10:00 am', close: '7:00 pm' },
  ],
  hoursNote:
    'Hours are as listed on our public profile. Please call ahead to confirm holiday hours.',
};

export const menuCategories: MenuCategory[] = [
  {
    id: 'cruffins',
    title: 'Cruffins & Viennoiserie',
    kicker: 'Morning pastries',
    description:
      'Cruffins, croissants, danishes and laminated favourites from the morning counter.',
    image: 'images/products/clean/cookie-butter-cruffin.jpg',
    href: '/menu#cruffins',
  },
  {
    id: 'cookies',
    title: 'Cookies, Scones & Brownies',
    kicker: 'Sweet treats',
    description:
      'Chewy cookies, tender scones, fudgy brownies and jam-filled favourites.',
    image: 'images/products/clean/chocolate-cookies.jpg',
    href: '/menu#cookies',
  },
  {
    id: 'tarts',
    title: 'Tarts & Individual Desserts',
    kicker: 'Patisserie tarts',
    description:
      'Crisp pastry shells with fruit, chocolate and caramel finishes.',
    image: 'images/products/clean/apple-caramel-pecan-tart.jpg',
    href: '/menu#tarts',
  },
  {
    id: 'cakes',
    title: 'Cakes & Cheesecakes',
    kicker: 'Vitrine cakes',
    description:
      'Whole cakes, cheesecakes and cupcakes for sharing around the table.',
    image: 'images/products/clean/black-forest-cake.jpg',
    href: '/menu#cakes',
  },
  {
    id: 'bread',
    title: 'Bread & Savoury Bakes',
    kicker: 'Daily hearth',
    description:
      'Portuguese country bread, sourdough and savoury bakes for a midday bite.',
    image: 'images/products/clean/sourdough.jpg',
    href: '/menu#bread',
  },
  {
    id: 'custom',
    title: 'Custom Celebration Cakes',
    kicker: 'Bespoke atelier',
    description:
      'Celebration cakes designed with our team for your milestone, from flavour to finish.',
    image: 'images/cakes/pressed-florals.jpg',
    href: '/custom-cakes',
  },
  {
    id: 'cafe',
    title: 'Café & Drinks',
    kicker: 'The bakery counter',
    description:
      'Coffee, tea and seasonal drinks to enjoy with your bake.',
    image: 'images/products/clean/strawberry-rhubarb-matcha.jpg',
    href: '/menu#cafe',
  },
];

export const homeCategories = menuCategories.filter(
  (category) => category.id !== 'cafe'
);

export const menuSections = menuCategories.filter(
  (category) => category.id !== 'custom'
);

export const products: Product[] = [
  // Cruffins & viennoiserie
  {
    slug: 'cookie-butter-cruffin',
    name: 'Cookie Butter Cruffin',
    category: 'cruffins',
    description:
      'A cruffin finished with cookie butter — one of the bakes our counter is known for.',
    image: 'images/products/clean/cookie-butter-cruffin.jpg',
    tags: ['cruffin'],
    featured: true,
  },
  {
    slug: 'churro-cruffin',
    name: 'Churro Cruffin',
    category: 'cruffins',
    description: 'A cinnamon-sugar cruffin with a soft, layered centre.',
    image: 'images/products/clean/churro-cruffin.jpg',
    tags: ['cruffin'],
    featured: true,
  },
  {
    slug: 'croissant-box',
    name: 'Croissant Box',
    category: 'cruffins',
    description: 'A box of golden, flaky croissants, made for sharing.',
    image: 'images/products/clean/croissant-box.jpg',
    tags: ['viennoiserie'],
  },
  {
    slug: 'fruit-danish',
    name: 'Fruit Danish',
    category: 'cruffins',
    description: 'A danish topped with seasonal fruit.',
    image: 'images/products/clean/fruit-danish.jpg',
    tags: ['viennoiserie'],
  },
  {
    slug: 'chocolate-raspberry-danish',
    name: 'Chocolate Raspberry Almond Danish',
    category: 'cruffins',
    description: 'A chocolate and raspberry danish finished with almonds.',
    image: 'images/products/clean/chocolate-raspberry-danish.jpg',
    tags: ['viennoiserie'],
  },
  {
    slug: 'iced-bun',
    name: 'Iced Bun',
    category: 'cruffins',
    description: 'A soft iced bun for a sweet morning treat.',
    image: 'images/products/clean/iced-bun.jpg',
    tags: ['viennoiserie'],
  },

  // Cookies, scones & brownies
  {
    slug: 'chocolate-cookies',
    name: 'Chocolate Cookies',
    category: 'cookies',
    description: 'Deeply chocolate cookies with a soft centre.',
    image: 'images/products/clean/chocolate-cookies.jpg',
    tags: ['cookie'],
  },
  {
    slug: 'raspberry-thumbprint',
    name: 'Raspberry Thumbprint',
    category: 'cookies',
    description: 'A buttery thumbprint cookie with raspberry jam.',
    image: 'images/products/clean/raspberry-thumbprint.jpg',
    tags: ['cookie'],
  },
  {
    slug: 'double-chocolate-pecan',
    name: 'Double Chocolate Pecan',
    category: 'cookies',
    description: 'A rich chocolate bake with pecans.',
    image: 'images/products/clean/double-chocolate-pecan.jpg',
    tags: ['cookie'],
  },
  {
    slug: 'chocolate-praline-brownie',
    name: 'Chocolate Hazelnut Praline Brownie',
    category: 'cookies',
    description: 'A fudgy chocolate brownie with hazelnut praline.',
    image: 'images/products/clean/chocolate-praline-brownie.jpg',
    tags: ['brownie'],
  },
  {
    slug: 'cherry-scone',
    name: 'Cherry Scone with White Chocolate & Almond',
    category: 'cookies',
    description: 'A tender scone with cherry, white chocolate and almond.',
    image: 'images/products/clean/cherry-scone.jpg',
    tags: ['scone'],
    featured: true,
  },

  // Tarts & individual desserts
  {
    slug: 'apple-caramel-pecan-tart',
    name: 'Apple Caramel Pecan Tart',
    category: 'tarts',
    description: 'A crisp tart filled with apple, caramel and pecan.',
    image: 'images/products/clean/apple-caramel-pecan-tart.jpg',
    tags: ['tart'],
    featured: true,
  },
  {
    slug: 'peanut-butter-tart',
    name: 'Peanut Butter & Dark Chocolate Tart',
    category: 'tarts',
    description: 'A chocolate tart with a smooth peanut butter filling.',
    image: 'images/products/clean/peanut-butter-tart.jpg',
    tags: ['tart'],
  },
  {
    slug: 'key-lime-tart',
    name: 'Key Lime Chocolate Tart',
    category: 'tarts',
    description: 'A bright key lime tart in a chocolate shell.',
    image: 'images/products/clean/key-lime-tart.jpg',
    tags: ['tart'],
  },
  {
    slug: 'raspberry-coconut-tart',
    name: 'Raspberry & Coconut Tart',
    category: 'tarts',
    description: 'A raspberry and coconut tart with a crisp pastry base.',
    image: 'images/products/clean/raspberry-coconut-tart.jpg',
    tags: ['tart'],
    featured: true,
  },
  {
    slug: 'pecan-tart-box',
    name: 'Pecan Tart Box',
    category: 'tarts',
    description: 'A box of pecan tarts, ready to share.',
    image: 'images/products/clean/pecan-tart-box.jpg',
    tags: ['tart'],
  },

  // Cakes & cheesecakes
  {
    slug: 'double-chocolate-cheesecake',
    name: 'Double Chocolate Cheesecake with Caramel Pecans',
    category: 'cakes',
    description: 'A chocolate cheesecake finished with caramel and pecans.',
    image: 'images/products/clean/double-chocolate-cheesecake.jpg',
    tags: ['cheesecake'],
    featured: true,
  },
  {
    slug: 'black-forest-cake',
    name: 'Black Forest Cake',
    category: 'cakes',
    description: 'A chocolate cake with cherry and cream.',
    image: 'images/products/clean/black-forest-cake.jpg',
    tags: ['cake'],
  },
  {
    slug: 'celebration-bunny-cakes',
    name: 'Celebration Bunny Cakes',
    category: 'cakes',
    description: 'Playful celebration cakes for a special occasion.',
    image: 'images/products/clean/celebration-bunny-cakes.jpg',
    tags: ['cake'],
  },
  {
    slug: 'birthday-galette',
    name: 'Birthday Galette',
    category: 'cakes',
    description: 'A celebration galette with a personalised message.',
    image: 'images/products/clean/birthday-galette.jpg',
    tags: ['cake'],
  },
  {
    slug: 'cupcakes',
    name: 'Cupcakes',
    category: 'cakes',
    description: 'A selection of cupcakes for a sweet celebration.',
    image: 'images/products/clean/cupcakes.jpg',
    tags: ['cake'],
  },

  // Bread & savoury
  {
    slug: 'portuguese-country-bread',
    name: 'Portuguese Country Bread',
    category: 'bread',
    description:
      'A rustic Portuguese-style country loaf, baked for the neighbourhood table.',
    image: 'images/products/clean/portuguese-country-bread.jpg',
    tags: ['bread'],
  },
  {
    slug: 'sourdough',
    name: 'Sourdough',
    category: 'bread',
    description: 'A sourdough loaf with a crisp crust.',
    image: 'images/products/clean/sourdough.jpg',
    tags: ['bread'],
  },
  {
    slug: 'bifana-sandwich',
    name: 'Bifana Sandwich',
    category: 'bread',
    description: 'A Portuguese-style sandwich served from the bakery counter.',
    image: 'images/products/clean/bifana-sandwich.jpg',
    tags: ['savoury'],
  },
  {
    slug: 'sandwiches',
    name: 'Savoury Sandwiches',
    category: 'bread',
    description: 'Savoury sandwiches for a midday bite.',
    image: 'images/products/clean/sandwiches.jpg',
    tags: ['savoury'],
  },

  // Café
  {
    slug: 'strawberry-rhubarb-matcha',
    name: 'Strawberry Rhubarb Matcha',
    category: 'cafe',
    description: 'A seasonal strawberry-rhubarb matcha drink.',
    image: 'images/products/clean/strawberry-rhubarb-matcha.jpg',
    tags: ['drink'],
  },
  {
    slug: 'coffee-pastry',
    name: 'Coffee & a Bake',
    category: 'cafe',
    description: 'Coffee and a pastry from the counter — a simple Toronto ritual.',
    image: 'images/products/clean/coffee-pastry.jpg',
    tags: ['drink'],
  },
];

export const featuredProducts = products.filter((product) => product.featured);

export interface SignatureFilter {
  id: string;
  label: string;
  tag?: string;
}

export const signatureFilters: SignatureFilter[] = [
  { id: 'all', label: 'All Bakes' },
  { id: 'cruffin', label: 'Cruffins', tag: 'cruffin' },
  { id: 'tart', label: 'Tarts', tag: 'tart' },
  { id: 'cheesecake', label: 'Cheesecakes', tag: 'cheesecake' },
  { id: 'scone', label: 'Cookies & Scones', tag: 'scone' },
];

export function formatAddress(): string {
  const { street, city, region, postalCode } = business.address;
  return `${street}, ${city}, ${region} ${postalCode}`;
}

export function productsForCategory(category: CategoryId): Product[] {
  return products.filter((product) => product.category === category);
}

export function categoryTitle(category: CategoryId): string {
  return (
    menuCategories.find((entry) => entry.id === category)?.title ?? category
  );
}
