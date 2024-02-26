import Image from "next/image";
import Link from "next/link";
import MainHeader from "./ui/header";

export default function Home() {
  return (
    <main>
      <MainHeader />
      <div className="flex max-h-200 flex-col items-center">
        <Image
          src="/logo.PNG"
          alt="Godmatch Logo"
          width={200}
          height={200}
          priority
        />
        <h1 className="text-sm font-bold">Matches Made in Heaven</h1>
        <div className="flex flex-row mt-4 mb-4 gap-2 ">
          <Link className="bg-black mr-2 px-4 py-2 rounded" href={"Signup"}>
            Get Started
          </Link>
          <Link className="bg-black mr-2 px-4 py-2 rounded" href={"/Login"}>
            Login
          </Link>
        </div>
        <div className="flex flex-row gap-2 justify-center items-center w-full mb-4 mt-4 p-4 justify-content">
          <p className="text-md text-white text-center">Our dating site provides a platform for singles looking to meet like-minded individuals, while our partnership with Kingdom Events offers the opportunity for in-person events that allow you to connect with potential matches in a fun and safe environment. We understand that not all relationships work out, which is why we also offer breakup services to help you navigate through the difficult process with support and guidance. In addition, our team of experts provides personalized dating advice to help you improve your dating game and attract the right partner. At GodMatch, we believe that everyone deserves love and a fulfilling relationship, and we are committed to helping you find it. Join us today and let&apos;s embark on this journey together!</p>
          <Image
            src="/gm-pic-2.PNG"
            alt="Unsplash Image"
            width={538}
            height={286}
            priority
            className="hidden md:block" 
          />
        </div>
        <div className="flex flex-row gap-2 justify-center items-center w-full mb-4 mt-4 p-4 justify-content">
          <Image
            src="/gm-pic-3.PNG"
            alt="Unsplash Image"
            width={538}
            height={286}
            priority
            className="hidden md:block" 
          />
          <p className="text-md text-white text-center">
          GodMatch is a platform that aims to prioritize real-life connections over virtual interactions. At GodMatch, we believe that meeting in person is the best way to truly get to know someone and form a lasting connection. We&apos;re dedicated to providing a safe, fun, and effective way for people to meet each other in real life, without the awkwardness and uncertainty of traditional online dating.
          </p>
        </div>
        <div className="flex flex-row gap-2 justify-center items-center w-full mb-4 mt-4 p-4 justify-content">
          <p className="text-md text-white text-center">Our team is made up of experienced dating experts who understand the challenges and frustrations of modern dating. We know that online dating can be overwhelming, time-consuming, and often disappointing. That&apos;s why we created GodMatch - to offer an alternative approach that puts the focus back on face-to-face interactions.</p>
          <Image
            src="/gm-pic-1.PNG"
            alt="Unsplash Image"
            width={538}
            height={286}
            priority
            className="hidden md:block" 
            />
        </div>
        <div className="flex flex-row gap-2 justify-center items-center w-full mb-4 mt-4 p-4 justify-content">
          <Image
          src={"/gm-pic-4.PNG"}
          alt="Unsplash Image"
          width={538}
          height={286}
          priority
          className="hidden md:block" 
          />
          <p className="text-md text-white text-center">
          At GodMatch, we use a variety of tools and strategies to help members connect with each other in the real world. Our events range from casual meetups and group outings to more structured activities like speed dating and singles mixers. We also offer personalized matchmaking services for members who want extra support in finding their perfect match.
          </p>
        </div>
        <div className="flex flex-row gap-2 justify-center items-center w-full mb-4 mt-4 p-4 justify-content">
          <p className="text-md text-white text-center">But our commitment to real-life connections goes beyond just organizing events and providing matchmaking services. We also offer resources and advice to help members build their social skills, improve their confidence, and develop a more positive and authentic approach to dating.</p>
          <Image
          src={"/gm-pic-5.PNG"}
          alt="Unsplash Image"
          width={538}
          height={286}
          priority
          className="hidden md:block" 
          />
        </div>
        <div className="flex flex-row gap-2 justify-center items-center w-full mb-4 mt-4 p-4 justify-content">
          <Image
          src={"/gm-pic-6.PNG"}
          alt="Unsplash Image"
          width={538}
          height={286}
          priority
          className="hidden md:block" 
          />
          <p className="text-md text-white text-center">At GodMatch, we believe that dating should be fun, exciting, and empowering. We&apos;re dedicated to helping people find meaningful connections that last, and we&apos;re passionate about bringing people together in real life. Join us today and experience the difference of GodMatch.</p>
        </div>
      </div>
    </main>
  );
}