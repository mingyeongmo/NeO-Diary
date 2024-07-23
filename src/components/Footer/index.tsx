import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <div className="footer_div">
        <span className="copyright">©2024 minmo All rights reserved.</span>
        <section>
          <span>
            <a href="https://github.com/mingyeongmo" target="_blank">
              Github
            </a>
          </span>
          <span>
            <a href="https://minmo.vercel.app" target="_blank">
              Blog
            </a>
          </span>
          <span>
            <a href="mailto:mingyeongmo9854@gmail.com">
              mingyeongmo9854@gmail.com
            </a>
          </span>
        </section>
      </div>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  border-top: 1px solid #f0f0f0;

  .footer_div {
    color: gray;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    .copyright {
      font-size: 0.9rem;
    }
  }

  section {
    display: flex;
    gap: 15px;
  }
  a {
    font-size: 0.8rem;
    color: gray;
  }
`;

export default Footer;
