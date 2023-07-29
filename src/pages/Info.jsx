import React from "react";

const Info = () => {
  return (
    <div className="journaling-page">
      <div className="journaling-info">
        <h3 className="journaling-heading">
          Journaling can be really useful in our daily lives.Writing down
          thoughts feelings and experiences can really make you feel better;
          even happier.
        </h3>
        <p className="journaling-quote">
          <strong>Laura Lewis Mantell: </strong>'Writing helps us because it
          gives us an outlet for our feelings rather than keeping them bottled
          up which makes us subject to them in unanticipated ways.'
        </p>
        <h4>For more information:</h4>
        <ul className="journaling-links">
          <li>
            <a href="https://www.urmc.rochester.edu/encyclopedia/content.aspx?ContentID=4552&ContentTypeID=1#:~:text=Keeping%20a%20journal%20helps%20you,de%2Dstress%20and%20wind%20down.">
              How journaling helps structure thoughts
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Info;
