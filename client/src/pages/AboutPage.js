import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {  faXTwitter } from '@fortawesome/free-brands-svg-icons';
import profileImage from '../assets/images/Pretty_Pandey_Profile.webp';
import EmailLink from '../components/EmailLink';
import PostFooter from '../components/PostFooter';

export default function AboutPage() {
  const buttonText = (
    <>
      <FontAwesomeIcon icon={faEnvelope} color='#9D68FF'/>
      Get in Touch
    </>
  )
    return (
        <div className='about-wrapper'>
            <div className='profile'>
                <img src={profileImage} alt='Profile'/>
                <ul>
                    <li>
                        <EmailLink 
                            emailAddress='blog@prettypandey.tech' 
                            subject='Blog Post: Title of Blog Post Here'
                            body='Please do not forget to reference the title of the blog post in the subject.'
                        />
                    </li>
                    <li>
                        <a href='https://www.prettypandey.tech' target='_blank' rel="noreferrer">
                            <FontAwesomeIcon icon={faAddressCard} color='#9D68FF' />Portfolio Website
                        </a>
                    </li>
                    <li>
                        <a href='https://www.twitter.com/prettyppandey' target='_blank' rel="noreferrer">
                            <FontAwesomeIcon icon={faXTwitter} color='#9D68FF' />Follow Me On Twitter/X
                        </a>
                    </li>
                    <li>
                      <EmailLink 
                        emailAddress='blog@prettypandey.tech' 
                        subject='Blog Post: Title of Blog Post Here'
                        body='Please do not forget to reference the title of the blog post in the subject.'
                        buttonText={buttonText}
                    />
                    </li>
                </ul>
            </div>

            <div className='text'>
                <p>Hello World! Welcome to PrettyTech.</p>
                <p>I'm Pretty Pandey, the face behind this tech blog. Thanks for stopping by!</p>
                <p>As a full-stack developer, I spend my days diving into lines of code, building projects, and exploring the latest trends in the tech world.
                    PrettyTech is my way of sharing what I've learned and experienced along the way.
                    Whether it's building a slick new web app or tinkering with cutting-edge AI, you'll get an inside look at the creative process behind the code.
                </p>
                <p>Expect to hear stories about my own projects – the highs, the lows, and everything in between.
                    And if you're working on something exciting too, I'd love to hear about it! Please feel free to get in touch.
                </p>
                <p>But this blog isn't just about my adventures in coding.
                    It's also a place to level up your skills with tutorials and insights covering everything from backend magic to frontend wizardry.
                </p>
                <p>So whether you're a seasoned developer looking for a different perspective or a newcomer eager to learn the ropes,
                    I invite you to join me on this journey through the wonderful world of technology.
                    Together, we'll explore, learn, and grow as we unlock the endless possibilities that await us in the world of code.
                </p>
                <p>So, grab a cup of your favorite beverage, take a seat, and let's explore the fascinating world of tech together.
                    Thanks for being part of this journey!</p>

                <PostFooter />
            </div>
        </div>
    );
}