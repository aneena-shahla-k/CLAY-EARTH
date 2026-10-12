import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Volume2 } from "lucide-react";
import "./HeroMain.css";

gsap.registerPlugin(ScrollTrigger);

export default function HeroMain() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  const [isAudioBlocked, setIsAudioBlocked] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    video.volume = 1;

    // =========================================
    // PLAY HERO VIDEO
    // =========================================

    const playHeroVideo = () => {
      video.muted = false;
      video.volume = 1;

      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsAudioBlocked(false);
          })
          .catch(() => {
            video.muted = true;

            video.play().catch(() => {});

            setIsAudioBlocked(true);
          });
      }
    };

    // =========================================
    // STOP VIDEO WHEN LEAVING HERO
    // =========================================

    const stopHeroVideo = () => {
      video.pause();
      video.muted = true;
    };

    // =========================================
    // UNMUTE ON USER INTERACTION
    // =========================================

    const handleFirstInteraction = () => {
      if (video) {
        video.muted = false;
        video.volume = 1;

        if (video.paused) {
          video.play().catch(() => {});
        }

        setIsAudioBlocked(false);
      }

      window.removeEventListener(
        "pointerdown",
        handleFirstInteraction
      );

      window.removeEventListener(
        "touchstart",
        handleFirstInteraction
      );

      window.removeEventListener(
        "keydown",
        handleFirstInteraction
      );
    };

    window.addEventListener(
      "pointerdown",
      handleFirstInteraction
    );

    window.addEventListener(
      "touchstart",
      handleFirstInteraction
    );

    window.addEventListener(
      "keydown",
      handleFirstInteraction
    );

    // Initial play
    playHeroVideo();

    // =========================================
    // GSAP SCROLL TRIGGER
    // =========================================

    const heroTrigger = ScrollTrigger.create({
      trigger: section,

      start: "top top",
      end: "bottom top",

      onEnter: () => {
        playHeroVideo();
      },

      onEnterBack: () => {
        playHeroVideo();
      },

      onLeave: () => {
        stopHeroVideo();
      },

      onLeaveBack: () => {
        stopHeroVideo();
      },
    });

    // =========================================
    // CLEANUP
    // =========================================

    return () => {
      heroTrigger.kill();

      stopHeroVideo();

      window.removeEventListener(
        "pointerdown",
        handleFirstInteraction
      );

      window.removeEventListener(
        "touchstart",
        handleFirstInteraction
      );

      window.removeEventListener(
        "keydown",
        handleFirstInteraction
      );
    };
  }, []);

  // =========================================
  // MANUAL UNMUTE
  // =========================================

  const handleManualUnmute = (e) => {
    e.stopPropagation();

    const video = videoRef.current;

    if (video) {
      video.muted = false;
      video.volume = 1;

      video.play().catch(() => {});

      setIsAudioBlocked(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="hero-section"
    >
      <div className="hero-video-wrap">

        {/* HERO VIDEO */}

        <video
          ref={videoRef}
          className="hero-video"
          src="https://res.cloudinary.com/zu7jndeq/video/upload/v1791269370/Creating_terracotta_candle_holde_E2_80_A6_1080p_20261006111953-ezremove_oq5kp2.mp4"
          playsInline
          autoPlay
          preload="auto"
          loop={false}
        />

        {/* VIDEO OVERLAY */}

        <div className="hero-overlay" />

        {/* SOUND BUTTON */}

        {isAudioBlocked && (
          <button
            type="button"
            className="hero-unmute-btn"
            onClick={handleManualUnmute}
            aria-label="Enable hero video sound"
          >
            <span className="unmute-icon">
              <Volume2
                size={14}
                strokeWidth={1.8}
              />
            </span>

            <span className="unmute-text">
              Tap for Sound
            </span>
          </button>
        )}

      </div>
    </section>
  );
}