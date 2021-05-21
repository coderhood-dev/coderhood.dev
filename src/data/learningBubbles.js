export const learningBubbles = [
  {
    status: 3,
    img: '/img/kakashi.png',
    position: { right: '8rem', top: '0.5rem' },
    animate: { y: [20, 0, -5, 10, 0], x: [10, 0, -7, 1, 0] },
  },
  {
    status: 1,
    img: '/img/meison.jpeg',
    position: { right: '3rem', top: '10rem' },
    animate: { y: [10, 0, 5, -10, 0], x: [5, 0, 7, -5, 0] },
  },
  {
    status: 0,
    img: '/img/lucas.jpg',
    position: { right: '15rem', top: '9rem' },
    animate: { y: [7, 0, -3, 5, 0], x: [-5, 0, -10, 5, 0] },
  },
  {
    status: -1,
    img: '/img/bab10.jpeg',
    position: { right: '12rem', top: '20rem' },
    animate: { y: [7, 0, -3, 5, 0], x: [-5, 0, -10, 5, 0] },
  },
]

// <= 0 = not born yet
// 1 = small
// 2 = medium
// 3 = big
// 4 = big
// 5 = big
// > 5 = waiting to reborn
