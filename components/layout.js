import React from 'react';
import Heading from './heading/Heading';

const Layout = ({ person, children }) => (
  <>
    <div id="App">
      <nav>
        <Heading person={person} />
      </nav>
      <div>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with <a href="https://nextjs.org">Next.js</a>
        </footer>
      </div>
    </div>
    <style jsx>
      {`
        #App {
          padding-left: 30%;
          position: relative;
        }
        nav {
          position: fixed;
          top: 0;
          bottom: 0;
          width: 30%;
          margin-left: -30%;
          background: #18213d;
          color: #fff;
          display: inline-block;
          zoom: 1;
          letter-spacing: normal;
          word-spacing: normal;
          vertical-align: top;
          text-rendering: auto;
        }
        main {
          zoom: 1;
          letter-spacing: normal;
          word-spacing: normal;
          vertical-align: top;
          text-rendering: auto;
          padding: 2em 3em 0;
        }
        footer {
          padding: 1em 3em;
          color: #aaa;
          border-top: 1px solid #eee;
          font-family: Georgia, Cambria, serif;
          line-height: 1.5em;
        }
        @media (max-width: 830px) {
          #App {
            padding: 0;
          }
          nav {
            width: 100%;
            position: relative;
            margin: 0;
          }
        }
        @media (max-width: 480px) {
          main {
            padding: 1em 1em 0;
          }
        }
        @media print {
          footer {
            display: none;
          }
          main {
            padding: 1em 2em;
          }
        }
      `}
    </style>
  </>
);

export default Layout;
