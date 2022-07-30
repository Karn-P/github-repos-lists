const CardUser = (props: any) => {
  const { repo } = props;
  const updateAt: string[] = repo.updated_at.split("T");
  const updateAtDate: string = updateAt[0];
  const updateAtTime: string = updateAt[1].slice(0, 5);

  return (
    <div className="card">
      <div className="title-span">
        <a href={repo.html_url} target="_blank" className="card-title">
          {repo.name}
        </a>
        <p className="des-box">{repo.description}</p>
      </div>
      <div className="topics-span">
        {repo.topics.map((topic: string) => {
          return (
            <a
              key={topic}
              href={`https://github.com/topics/${topic}`}
              target="_blank"
            >
              <span className="topic-tag">{topic}</span>
            </a>
          );
        })}
      </div>
      <div className="sub-detail">
        {repo.language !== null && (
          <>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1336/1336494.png"
              alt="coding-language"
              width="25"
              height="25"
            />
            <p className="small-text">{repo.language}</p>
            <br />
          </>
        )}
        <>
          <img
            src="https://cdn-icons-png.flaticon.com/512/833/833593.png"
            alt="calendar"
            width="25"
            height="25"
          />
          <p className="small-text">Updated: {updateAtDate}</p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/992/992700.png"
            alt="time"
            width="25"
            height="25"
          />
          <p className="small-text">{updateAtTime}</p>
        </>
      </div>
    </div>
  );
};

export default CardUser;
