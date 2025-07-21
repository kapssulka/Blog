import GridPostsItem from "./../GridPostsItem/GridPostsItem";

export default function GridPosts() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <GridPostsItem
        content={
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Accusantium modi pariatur totam consectetur velit commodi
            consequuntur vitae iure repudiandae natus eveniet ipsum, quibusdam
            cum nisi, similique amet distinctio vel at fuga, ea atque omnis?
            Laboriosam natus libero quis odio enim autem aliquam? Eligendi illum
            ex nesciunt recusandae nam, provident laudantium. Expedita
            laudantium sit ex nesciunt repellendus nulla eaque incidunt, alias
            aspernatur hic accusantium tempore illo praesentium molestias, optio
            ratione? Aut, natus. Illo voluptas dicta perferendis! Commodi nobis
            error voluptate possimus libero fugiat dolor rerum, magni quam ipsum
            est perspiciatis dicta fuga consequatur saepe nulla nihil inventore,
            sint corporis sapiente maiores.
          </p>
        }
      />
      <GridPostsItem />
      <GridPostsItem />
      <GridPostsItem />
    </div>
  );
}
