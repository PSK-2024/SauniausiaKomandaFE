import { RecipeData } from '../state/model/recipeModel';

export const mockRecipe: RecipeData = {
  title: 'Classic Cheesecake',
  rating: 4,
  duration: 90,
  calories: 350,
  image:
    'https://static01.nyt.com/images/2021/11/02/dining/dg-Tall-and-Creamy-Cheesecake-copy/dg-Tall-and-Creamy-Cheesecake-superJumbo.jpg',
  ingredients: [
    {
      groupName: 'For the Crust',
      items: [
        { name: 'Graham cracker crumbs', amount: '1 1/2 cups' },
        { name: 'Melted butter', amount: '1/3 cup' },
        { name: 'Granulated sugar', amount: '1/4 cup' },
      ],
    },
    {
      groupName: 'For the Filling',
      items: [
        { name: 'Cream cheese', amount: '500g' },
        { name: 'Granulated sugar', amount: '1 cup' },
        { name: 'Vanilla extract', amount: '2 tsp' },
        { name: 'Eggs', amount: '3' },
        { name: 'Sour cream', amount: '1 cup' },
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
      author: 'Jane Doe',
      rating: 5,
    },
    {
      id: 2,
      text: 'Great recipe, though I added more sugar.',
      author: 'John Smith',
      rating: 2,
    },
  ],
};
