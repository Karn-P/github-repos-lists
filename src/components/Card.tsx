import "./Card.css";

const Card = (props: any) => {
  const { repo } = props;

  return (
    <div className="card">
      <div className="title-span">
        <div className="title-image">
          <a href={repo.html_url} target="_blank" className="card-title">
            {repo.full_name}
          </a>
          <img src={repo.owner.avatar_url} alt="Avatar" className="avatar" />
        </div>
        <p className="des-box">{repo.description}</p>
      </div>
    </div>
  );
};

export default Card;
