import { RecipeData } from '../state/model/recipeModel';

export const mockRecipe: RecipeData = {
  title: 'Classic Cheesecake',
  category: 'Dessert',
  rating: 4,
  duration: 90,
  calories: 350,
  image:
    'https://static01.nyt.com/images/2021/11/02/dining/dg-Tall-and-Creamy-Cheesecake-copy/dg-Tall-and-Creamy-Cheesecake-superJumbo.jpg',
  ingredients: [
    {
      groupName: 'For the Crust',
      items: [
        { name: 'Graham cracker crumbs 1 1/2 cups' },
        { name: 'Melted butter 1/3 cup' },
        { name: 'Granulated sugar 1/4 cup' },
      ],
    },
    {
      groupName: 'For the Filling',
      items: [
        { name: 'Cream cheese 500g' },
        { name: 'Granulated sugar 1 cup' },
        { name: 'Vanilla extract 2 tsp' },
        { name: '3 Eggs' },
        { name: 'Sour cream 1 cup' },
      ],
    },
  ],
  instructions: [
    { step: 'Preheat oven to 325°F.' },
    { step: 'Mix crust ingredients and press into pan.' },
    { step: 'Blend filling ingredients and pour over crust.' },
    { step: 'Bake for 55 minutes.' },
    { step: 'Chill overnight before serving.' },
  ],
  reviews: [
    {
      id: 1,
      text: 'Absolutely delicious! Will make again.',
      author: {
        userId: 1,
        email: 'a@a.com',
        firstName: 'Jane',
        lastName: 'Doe',
      },
      rating: 5,
    },
    {
      id: 2,
      text: 'Great recipe, though I added more sugar.',
      author: {
        userId: 1,
        email: 'a@a.com',
        firstName: 'Jane',
        lastName: 'Doe',
      },
      rating: 2,
    },
  ],
  categories: [{ name: 'Dessert' }],
};
