import { RecipeData } from '../state/model/recipeModel';

export const mockRecipe: RecipeData = {
  title: 'Classic Cheesecake',
  rating: 4,
  duration: 90,
  calories: 350,
  image:
    'https://cdn.loveandlemons.com/wp-content/uploads/2021/04/green-salad-1.jpg',
  ingredients: [
    { name: 'Cream cheese', amount: '500g' },
    { name: 'Granulated sugar', amount: '1 cup' },
    { name: 'Vanilla extract', amount: '2 tsp' },
    { name: 'Eggs', amount: '3' },
    { name: 'Sour cream', amount: '1 cup' },
    { name: 'Graham cracker crust', amount: '1' },
  ],
  instructions: [
    { step: 'Preheat oven to 325°F (163°C).' },
    { step: 'Mix cream cheese and sugar until smooth.' },
    {
      step: 'Add vanilla and eggs, one at a time, mixing on low after each just until blended.',
    },
    { step: 'Pour over crust and smooth the top.' },
    { step: 'Bake for 55 minutes or until center is almost set.' },
    { step: 'Cool completely in the oven with the door open.' },
    { step: 'Refrigerate cheesecake for at least 4 hours.' },
  ],
  comments: [
    {
      id: 1,
      text: 'Absolutely delicious! Will make again.',
      author: 'Jane Doe',
    },
    {
      id: 2,
      text: 'Great recipe, though I added more sugar.',
      author: 'John Smith',
    },
  ],
};
