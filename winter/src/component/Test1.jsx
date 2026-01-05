const profiles = [
  {
    name: "김희연",
    job: "Frontend Devloper",
    isOnline: true
  },
  {
    name: "홍길동",
    job: "React Student",
    isOnline: true
  },
]

const Test1 = ()=> {
  return (
    <>
      <h1 className="text-3x1 font-bold text-blue-600">
        Tailwind v4 Ready 🚀
      </h1>
      {
        profiles.map((profile, index) => {
          return (
            <Profile name={profiles[index].name}
              job={profiles[index].job}
              isOnline={profiles[index].isOnline}>
            </Profile>
          )
        })
      }
    </>
  )
}

const Profile = (props) => {
  return (
    <>
      <h1>
        {props.name}
      </h1>
      <p>
        {props.job}
      </p>
      <p>
        {props.isOnline === true ? "온라인" : "오프라인"}
      </p>
    </>
  )
}

export default Test1;