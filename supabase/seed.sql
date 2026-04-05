insert into public.menu_items (name, description, price, category, image_url, rating)
values
  (
    'Charred Burrata',
    'Fire-roasted tomatoes, basil oil, aged balsamic pearls, and grilled sourdough.',
    16,
    'Starters',
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    4.8
  ),
  (
    'Truffle Mushroom Arancini',
    'Crisp risotto croquettes with black truffle aioli and shaved pecorino.',
    14,
    'Starters',
    'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
    4.7
  ),
  (
    'Citrus Tuna Crudo',
    'Yellowfin tuna, blood orange, pickled shallots, chili crisp, and micro herbs.',
    19,
    'Starters',
    'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80',
    4.9
  ),
  (
    'Smoked Ribeye',
    '12oz ribeye, roasted garlic butter, crispy shallots, and pomme puree.',
    38,
    'Main Course',
    'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80',
    4.9
  ),
  (
    'Saffron Seafood Linguine',
    'House-made pasta with prawns, mussels, confit tomato, and saffron cream.',
    31,
    'Main Course',
    'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80',
    4.8
  ),
  (
    'Miso Glazed Salmon',
    'Cedar-smoked salmon, sesame greens, forbidden rice, and yuzu beurre blanc.',
    29,
    'Main Course',
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80',
    4.7
  ),
  (
    'Wild Mushroom Risotto',
    'Carnaroli rice, king oyster mushrooms, parmesan foam, and white truffle dust.',
    27,
    'Main Course',
    'https://images.unsplash.com/photo-1633964913295-ceb43826cd73?auto=format&fit=crop&w=1200&q=80',
    4.6
  ),
  (
    'Dark Chocolate Dome',
    'Valrhona mousse, salted caramel core, hazelnut crunch, and cocoa glaze.',
    13,
    'Desserts',
    'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80',
    4.9
  ),
  (
    'Burnt Vanilla Basque Cheesecake',
    'Creamy cheesecake finished with macerated berries and citrus zest.',
    12,
    'Desserts',
    'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1200&q=80',
    4.8
  ),
  (
    'Espresso Tiramisu',
    'Mascarpone cloud, espresso-soaked sponge, cocoa nibs, and coffee caramel.',
    11,
    'Desserts',
    'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=80',
    4.7
  ),
  (
    'Midnight Citrus Spritz',
    'Charred grapefruit, rosemary syrup, sparkling tonic, and orange peel.',
    10,
    'Drinks',
    'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1200&q=80',
    4.5
  ),
  (
    'Iced Pistachio Latte',
    'House pistachio cream, double espresso, oat milk, and sea salt finish.',
    8,
    'Drinks',
    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=80',
    4.6
  )
on conflict (name) do update
set
  description = excluded.description,
  price = excluded.price,
  category = excluded.category,
  image_url = excluded.image_url,
  rating = excluded.rating,
  updated_at = timezone('utc', now());
