import GridPostsItem from "./../GridPostsItem/GridPostsItem";

export default function GridPosts() {
  const testPosts = [
    {
      src: ["https://picsum.photos/800", "https://picsum.photos/800/600"], // 1:1 квадрат
      description: "Случайная квадратная картинка 800×800 (1:1)",
    },
    {
      src: ["https://picsum.photos/800/600"], // 4:3
      description: "Случайная картинка 800×600 (4:3)",
    },
    {
      src: ["https://picsum.photos/1600/900"], // 16:9
      description: "Случайная картинка 1600×900 (16:9)",
    },
    {
      src: [
        "https://picsum.photos/1500/1000",
        "https://picsum.photos/800/600",
        "https://picsum.photos/1600/900",
      ], // 3:2
      description: "Случайная картинка 1500×1000 (3:2)",
    },
    {
      src: ["https://picsum.photos/2100/900"], // 21:9
      description: "Случайная картинка 2100×900 (21:9)",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {testPosts.map((item) => {
        const id = crypto.randomUUID();
        return <GridPostsItem key={id} src={item.src[0]} />;
      })}
    </div>
  );
}
