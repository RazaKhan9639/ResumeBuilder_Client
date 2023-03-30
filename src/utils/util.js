import emailjs from "@emailjs/browser";
import axios from "axios";

const sendResume = (formData, setLoading, navigate) => {
  setLoading(true);

  axios
    .post("http://localhost:4000/resume/send", formData, {})
    .then((res) => {
      if (res.data.message) {
        const {
          cover_letter,
          recruiter_email,
          my_email,
          applicant_name,
          resume,
        } = res.data.data;
        emailjs
          .send(
            "YOUR_SERVICE_ID_ON_EMAILJS",

            "YOUR_TEMPLATE_ID_ON_EMAILJS",

            {
              cover_letter,
              applicant_name,
              recruiter_email,
              my_email,
              resume,
            },
            "YOUR_PUBLIC_KEY_ON_EMAILJS"
          )
          .then((res) => {
            if (res.status === 200) {
              setLoading(false);
              alert("Message sent!");
              navigate("/");
            }
          })
          .catch((err) => console.error(err));
      }
    })
    .catch((err) => console.error(err));
};
export default sendResume;
