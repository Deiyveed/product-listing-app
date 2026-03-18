This is a product listing app,  were a fakestore api was consumed to get grid of products. There is an add to cart function where the numbers of item added to cart is stored. There is also use of dynamic routing to get each products on a different page when clicked. Lastly, there is search option to easily find products by title.

## My Approach

I built the application using Next.js with the App Router to take advantage of modern routing without the stress of react router dom

I separated concerns by:

Creating reusable components such as product cards and search input

Abstracting data fetching into a custom hook for cleaner logic. I like to separate logic from design where necessary.

Using Zustand for global state management to handle cart functionality without too many prop drilling

I implemented dynamic routing for product detail pages using [id], allowing each product to have its own dedicated page.

I made use of props where applicable.

For UI/UX, I used Tailwind CSS for styling and Ant Design Skeletons to improve perceived performance during loading states.

## Trade offs and Assumptions

I chose client-side data fetching for product details using useEffect instead of server-side fetching for simplicity and flexibility with interactivity (e.g., cart actions).

I assumed the API response structure would remain consistent (id, title, price, etc.), so I strongly typed it with TypeScript.

I used local state and Zustand instead of a more complex solution like Redux to keep the implementation lightweight and easy to maintain.

## What I would improve with more time

With more time, I would:

Implement pagination or infinite scrolling instead of loading all products at once

Add a full cart page with quantity controls and checkout integration

Impleement persist for the store so it stays the same even upon reload

Implement search based on other criterias

Design more aesthetically pleasing Ui
