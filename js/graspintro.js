define([
  "jquery",
  "bootstrap",
  "TweenMax",
  "DrawSVGPlugin",
  "MorphSVGPlugin"
], function($, bootstrap, TweenMax, DrawSVGPlugin, MorphSVGPlugin) {
  function GraspIntro() {
    var publicAPI = {};

    var $graspLetterG = $("#pathGraspLetterG");
    var $svgGraspLogo = $("#svgGraspLogo");
    var $allLetters = $(".letter");
    var $allLettersRect = $(".letterRect");
    var $pathRectG = $("#pathRectG");
    var $pathCircleA = $("#pathCircleA");
    var pathRectGPosition = $pathRectG.offset();
    var masterTL;
    var $pathRectBackground = $("#pathRectBackground");
    var $grpAnalysis = $("#gAnalysis");
    var $grpMap = $("#gMap");
    var $grpEpidem = $("#gEpidem");
    var $grpGlobe = $("#gGlobe");
    var $grpEarthquake = $("#gEarthquake");

    function calculateOffset(elem) {
      var xOffset;
      xOffset =
        $pathCircleA[0]._gsTransform.xOrigin - elem._gsTransform.xOrigin;
      return xOffset;
    }

    function moveSquaresToTopOfCircle(timeLine) {
      var element;
      var xOffset;

      for (let i = 0; i < $allLettersRect.length; i++) {
        element = $allLettersRect[i];
        xOffset = calculateOffset(element);
        timeLine.set(element, {
          x: xOffset
        });
      }
    }

    function prepAssets() {
      var tL = new TimelineMax();

      // 29Mar2018
      tL.set($pathRectBackground, {
        autoAlpha: 1,
        transformOrigin: "center center"
      });

      // init '_gsTransform' object creation, change any 'transform' parameter.
      tL.set([$allLettersRect, $pathCircleA], {
        x: "+=0"
      });
      moveSquaresToTopOfCircle(tL);

      /* // 30Mar2018
    tL.set($("#pathPageBackgroundPattern"), {
      svgOrigin: "50% 50%"
    });
    tL.to($("#pathPageBackgroundPattern"), 3, { rotation: 360 }); */

      return tL;
    }

    function loadSquares() {
      var tL = new TimelineMax({ delay: 0.3 });

      tL.to($allLettersRect, 1, {
        // scale: 1,
        autoAlpha: 1,
        rotation: 360,
        transformOrigin: "50% 50%",
        ease: Elastic.easeOut.config(1, 0.3)
      });

      for (let i = 0; i < $allLettersRect.length; i++) {
        tL.to(
          $allLettersRect[i],
          0.2,
          {
            x: 0,
            ease: Elastic.easeOut.config(1, 0.3)
          },
          "-=0.2"
        );
      }

      return tL;
    }

    function changeSquaresFill() {
      var tL = new TimelineMax();

      tL.to($allLettersRect, 0.3, {
        fill: "white",
        ease: Elastic.easeOut.config(1, 0.3)
      });

      return tL;
    }

    function loadAnalysisBarChart() {
      var $BarChartOuterBox = $("#pathAnalysisBarChartOuterBox");
      var $BarChartGreenBox = $("#pathAnalysisBarChartGreenBox");
      var $BarChartWhiteCalloutBox = $("#pathAnalysisBarChartWhiteCalloutBox");
      var $BarChartYellowRect = $("#pathAnalysisBarChartYellowRect");
      var $BarChartRedRect = $("#pathAnalysisBarChartRedRect");
      var $BarChartGreenRect = $("#pathAnalysisBarChartGreenRect");
      var $BarChartHorizontalRect = $("#pathAnalysisBarChartHorizontalRect");
      var tL = new TimelineMax();

      tL.set($BarChartOuterBox, {
        scale: 0,
        transformOrigin: "50% 50%"
      }).to($BarChartOuterBox, 0.1, {
        autoAlpha: 1,
        scale: 1,
        ease: Elastic.easeOut.config(1, 0.3)
      });

      tL.set($BarChartGreenBox, {
        transformOrigin: "50% 50%"
      }).to($BarChartGreenBox, 0.1, {
        autoAlpha: 1
      });

      tL.set($BarChartWhiteCalloutBox, {
        scale: 0,
        transformOrigin: "50% 50%"
      });
      tL.to($BarChartWhiteCalloutBox, 0.1, {
        scale: 1,
        autoAlpha: 1,
        ease: Elastic.easeOut.config(1, 0.3)
      });

      tL.fromTo(
        [$BarChartRedRect, $BarChartYellowRect, $BarChartGreenRect],
        0.5,
        {
          scaleY: 0,
          transformOrigin: "100% 100%",
          autoAlpha: 1
        },
        { scaleY: 1, ease: Elastic.easeOut.config(1, 0.3) },
        0.2
      );

      tL.fromTo(
        $BarChartHorizontalRect,
        0.2,
        { scaleX: 0, autoAlpha: 1 },
        { scaleX: 1 },
        0.2
      );

      return tL;
    }

    function loadAnalysisPieChart() {
      var $PieChartWhiteCircle = $("#pathAnalysisPieChartWhiteCircle");
      var $PieChartBlueCircle = $("#pathAnalysisPieChartBlueCircle");
      var $PieChartGrayPie = $("#pathAnalysisPieChartGrayPie");
      var $PieChartYellowPie = $("#pathAnalysisPieChartYellowPie");
      var $PieChartRedPie = $("#pathAnalysisPieChartRedPie");
      var $PieChartBluePie = $("#pathAnalysisPieChartBluePie");

      var tL = new TimelineMax();

      tL.fromTo(
        [$PieChartWhiteCircle, $PieChartBlueCircle],
        0.1,
        { scale: 0, transformOrigin: "50% 50%" },
        { scale: 1, autoAlpha: 1 }
      );

      tL.fromTo(
        [
          $PieChartGrayPie,
          $PieChartYellowPie,
          $PieChartRedPie,
          $PieChartBluePie
        ],
        0.5,
        { scale: 0, transformOrigin: "50% 50%" },
        {
          scale: 1,
          rotation: 360,
          autoAlpha: 1,
          ease: Elastic.easeOut.config(1, 0.3)
        }
      );

      return tL;
    }

    function loadAnalysisBackgroundCircles() {
      var $YellowCircle = $("#pathAnalysisYellowCircle");
      var $BlueDottedCircle = $("#pathAnalysisBlueDottedCircle");

      var tL = new TimelineMax();

      tL.fromTo(
        $BlueDottedCircle,
        0.1,
        { scale: 0, transformOrigin: "50% 50%" },
        { autoAlpha: 1, scale: 1, ease: Elastic.easeOut.config(1, 0.3) }
      );
      tL.to($YellowCircle, 0.1, { autoAlpha: 1 }, "-=0.2");
      return tL;
    }

    function loadAnalysis() {
      var $AnalysisComponents = $(".analysis");

      var mastertL = new TimelineMax();

      mastertL.add(loadAnalysisBarChart());
      mastertL.add(loadAnalysisBackgroundCircles(), "-=0.6");
      mastertL.add(loadAnalysisPieChart(), "-=0.3");

      return mastertL;
    }

    function loadMap() {
      var $BlueCircle = $("#pathMapBlueCircle");
      var $grpFoldout = $("#gMapFoldout");
      var $MapMarkerOrangeBalloon = $("#pathMapMarkerOrangeBalloon");
      var $MapMarkerWhiteCircle = $("#pathMapMarkerWhiteCircle");
      var tL = new TimelineMax();

      tL.fromTo(
        $BlueCircle,
        0.08,
        { scale: 0, transformOrigin: "50% 50%" },
        { autoAlpha: 1, scale: 1 }
      );

      tL.fromTo(
        $grpFoldout,
        0.8,
        {
          scaleX: 0,
          autoAlpha: 1
        },
        { scaleX: 1, ease: Elastic.easeOut.config(1, 0.3) }
      );

      tL.fromTo(
        $MapMarkerOrangeBalloon,
        0.8,
        {
          scaleY: 0,
          autoAlpha: 1,
          transformOrigin: "0% 100%"
        },
        { scaleY: 1, ease: Elastic.easeOut.config(1, 0.3) },
        "-=0.9"
      );

      tL.fromTo(
        $MapMarkerWhiteCircle,
        0.6,
        { scale: 0, transformOrigin: "50% 50%" },
        { autoAlpha: 1, scale: 1, ease: Elastic.easeOut.config(1, 0.3) },
        "-=0.4"
      );

      return tL;
    }

    function loadEpidem() {
      var $PinkCircle = $("#pathEpidemPinkCircle");
      var $YelloMagGlass = $("#pathEpidemYelloMagGlass");
      var $BlueCircle = $("#pathEpidemBlueCircle");
      var $grpBlueCircleBugs = $("#gEpidemBlueCircleBugs");
      var $grpBigBlueBug = $("#gEpidemBigBlueBug");
      var $grpSmallRectBlueBugs = $("#gEpidemSmallBlueBugs");
      var $BigRedBug = $("#pathEpidemBigRedBug");
      var $MediumRedBug = $("#pathEpidemMediumRedBug");
      var $SmallCircleBlueBugsColl = $(".smallBlueBug");

      var tL = new TimelineMax();

      tL.fromTo(
        $PinkCircle,
        0.08,
        { scale: 0, transformOrigin: "50% 50%" },
        { autoAlpha: 1, scale: 1 }
      );
      tL.fromTo(
        $YelloMagGlass,
        0.3,
        { scaleY: 0, transformOrigin: "0% 100%" },
        { autoAlpha: 1, scaleY: 1, ease: Elastic.easeOut.config(1, 0.3) }
      );
      tL.to($("#path1972"), 0.05, { autoAlpha: 1 }); // 'path1972' refers to $grpMagGlassJoint
      tL.fromTo(
        $BlueCircle,
        0.08,
        { scale: 0, transformOrigin: "50% 50%" },
        { autoAlpha: 1, scale: 1 },
        "-=0.5"
      );
      tL.staggerTo(
        [
          $grpBlueCircleBugs,
          $grpSmallRectBlueBugs,
          $grpBigBlueBug,
          $BigRedBug,
          $MediumRedBug,
          $SmallCircleBlueBugsColl
        ],
        0.1,
        { autoAlpha: 1 },
        0.02
      );
      tL.to(
        $("#circle2020,#circle2016,#circle2020,#circle2024"),
        0.1,
        {
          autoAlpha: 1
        },
        "-=0.4"
      );

      return tL;
    }

    function loadEarthquake() {
      var tL = new TimelineMax();
      tL.timeScale(2);
      tL.fromTo(
        $("#pathEarthquakeTopYellowBackground"),
        0.05,
        { scale: 0, transformOrigin: "50% 50%" },
        { autoAlpha: 1, scale: 1 },
        "-=0.5"
      );
      tL.staggerTo(
        $(
          "#gPathEarthquakeBottomYellowBackground,#pathEarthquakeValley,#pathEarthquakeYellowCloudShadow,#gPathEarthquakeSurface,#pathEarthquakeSurface1"
        ),
        0.3,
        { autoAlpha: 1 },
        0.05
      );

      tL.fromTo(
        $("#pathEarthquakeRedBldg"),
        0.09,
        { scaleY: 0, transformOrigin: "0% 0%" },
        { autoAlpha: 1, scaleY: 1, ease: Elastic.easeOut.config(1, 0.3) }
      );
      tL.fromTo(
        $(
          "#pathEarthquakeBlueBldgVerticalRect,#pathEarthquakeBlueBldgVerticalRect1"
        ),
        0.09,
        { scaleY: 0, transformOrigin: "0% 100%" },
        { autoAlpha: 1, scaleY: 1, ease: Elastic.easeOut.config(1, 0.3) }
      );
      tL.fromTo(
        $("#pathEarthquakeWhiteBldgLeft,#pathEarthquakeWhiteBldgYellowRight"),
        0.09,
        { scaleY: 0, transformOrigin: "0% 100%" },
        { autoAlpha: 1, scaleY: 1, ease: Elastic.easeOut.config(1, 0.3) }
      );

      tL.staggerTo(
        $(
          "#pathEarthquakeBlueBldgWindow1,#pathEarthquakeBlueBldgWindow2,#pathEarthquakeBlueBldgWindow3,#pathEarthquakeBlueBldgWindow4,#pathEarthquakeBlueBldgWindow5,#pathEarthquakeBlueBldgWindow6"
        ),
        0.2,
        { autoAlpha: 1 },
        0.02,
        "StaggerWindows"
      );
      tL.staggerTo(
        $(
          "#gPathEarthquakeWhiteBldgWindow1,#gPathEarthquakeWhiteBldgWindow2,#gPathEarthquakeWhiteBldgWindow3,#gPathEarthquakeWhiteBldgWindow4,#gPathEarthquakeWhiteBldgWindow5,#gPathEarthquakeWhiteBldgWindow6"
        ),
        0.2,
        { autoAlpha: 1 },
        0.02,
        "StaggerWindows"
      );

      tL.fromTo(
        $(
          "#pathEarthquakeCloud1White,#pathEarthquakeCloud1Yellow,#pathEarthquakeCloud2White,#pathEarthquakeCloud2Yellow,#pathEarthquakeCloud3White,#pathEarthquakeCloud3Yellow"
        ),
        0.4,
        { xPercent: -200 },
        { xPercent: 0, autoAlpha: 1 },
        "StaggerWindows"
      );

      return tL;
    }

    function loadGlobe() {
      // var animationPathForMovingCircle1;

      var $BlueCircle = $("#pathGlobeBlueCircle");
      var $grpGlobeContinents = $("#gGlobeContinents");

      var tL = new TimelineMax();
      tL.to($BlueCircle, 0.1, { autoAlpha: 1 }, "blueGlobeLoaded");
      tL.to($grpGlobeContinents, 0.4, { autoAlpha: 1 });

      /* animationPathForMovingCircle1 = MorphSVGPlugin.pathDataToBezier(
        "#pathMaskBezierCurv1",
        { align: "#pathMovingCircle1" }
      );

      tL.to(
        "#pathMovingCircle1",
        0.6,
        {
          autoAlpha: 1,
          bezier: { values: animationPathForMovingCircle1, type: "cubic" },
          ease: Sine.easeOut
        },
        "blueGlobeLoaded"
      ).to("#pathMovingCircle1", 0.1, { autoAlpha: 0 }); */

      return tL;
    }

    function loadMovingCircle1() {
      var animationPathForMovingCircle1;
      var tL = new TimelineMax();

      animationPathForMovingCircle1 = MorphSVGPlugin.pathDataToBezier(
        "#pathMaskBezierCurv1",
        { align: "#pathMovingCircle1" }
      );

      tL.to(
        "#pathMovingCircle1",
        0.6,
        {
          autoAlpha: 1,
          bezier: { values: animationPathForMovingCircle1, type: "cubic" },
          ease: Sine.easeOut
        },
        "blueGlobeLoaded"
      ).to("#pathMovingCircle1", 0.1, { autoAlpha: 0 });

      return tL;
    }

    function loadSatellite1() {
      var animationPathForSatellite1;

      // var tL = new TimelineMax({repeat:4, repeatDelay:0.3});
      var tL = new TimelineMax();

      animationPathForSatellite1 = MorphSVGPlugin.pathDataToBezier(
        "#pathSatellite1FlightMask",
        { align: "#gSatellite1" }
      );

      tL.to(
        "#gSatellite1",
        1,
        {
          autoAlpha: 1,
          bezier: { values: animationPathForSatellite1, type: "cubic" },
          ease: Sine.easeOut
        },
        "+=0.4",
        "blueGlobeLoaded"
      ).to("#gSatellite1", 0.1, { autoAlpha: 0 });

      return tL;
    }

    function hideGraspActivities() {
      var tL = new TimelineMax();
      tL.to($("#gAnalysis,#gMap,#gEpidem,#gGlobe,#gEarthquake"), 0.2, {
        autoAlpha: 0,
        scale: 0,
        transformOrigin: "50%,50%"
      });
      return tL;
    }

    function showWords() {
      var tL = new TimelineMax();

      tL.fromTo(
        $("#grpWordPlace"),
        0.1,
        { yPercent: -100 },
        { yPercent: 0, autoAlpha: 1, ease: Elastic.easeOut.config(1, 0.3) }
      );

      tL.fromTo(
        $("#grpWordPlace"),
        0.1,
        { yPercent: 0 },
        { yPercent: 100, autoAlpha: 0, ease: Elastic.easeOut.config(1, 0.3) },
        "+=0.4"
      );

      tL.fromTo(
        $("#grpWordTrend"),
        0.1,
        { yPercent: -100 },
        { yPercent: 0, autoAlpha: 1, ease: Elastic.easeOut.config(1, 0.3) }
      );

      tL.fromTo(
        $("#grpWordTrend"),
        0.1,
        { yPercent: 0 },
        { yPercent: 100, autoAlpha: 0, ease: Elastic.easeOut.config(1, 0.3) },
        "+=0.4"
      );

      tL.fromTo(
        $("#grpWordVirus"),
        0.1,
        { yPercent: -100 },
        { yPercent: 0, autoAlpha: 1, ease: Elastic.easeOut.config(1, 0.3) }
      );

      tL.fromTo(
        $("#grpWordVirus"),
        0.1,
        { yPercent: 0 },
        { yPercent: 100, autoAlpha: 0, ease: Elastic.easeOut.config(1, 0.3) },
        "+=0.4"
      );

      tL.fromTo(
        $("#grpWordTrack"),
        0.1,
        { yPercent: -100 },
        { yPercent: 0, autoAlpha: 1, ease: Elastic.easeOut.config(1, 0.3) }
      );

      tL.fromTo(
        $("#grpWordTrack"),
        0.1,
        { yPercent: 0 },
        { yPercent: 100, autoAlpha: 0, ease: Elastic.easeOut.config(1, 0.3) },
        "+=0.4"
      );

      tL.fromTo(
        $("#grpWordGrasp"),
        0.1,
        { yPercent: -100 },
        { yPercent: 0, autoAlpha: 1, ease: Elastic.easeOut.config(1, 0.3) }
      );

      // 4Nov2019 tL.to($("#rectPageBackground"), 0.5, { autoAlpha: 0 });

      return tL;
    }

    function collapseGRASPBlueBackground() {
      var tL = new TimelineMax();
      tL.fromTo(
        $pathRectBackground,
        0.5,
        {
          scale: 4
        },
        {
          scale: 1,

          ease: Elastic.easeOut.config(1, 0.3)
        },
        "+=0.4"
      );
      return tL;
    }

    function loadCircleBursts() {
      var $pathCircleBurstGreenCircle = $("#pathCircleBurstGreenCircle");
      var $pathCircleBurstRedDottedCircle = $(
        "#pathCircleBurstRedDottedCircle"
      );
      var tL = new TimelineMax();

      tL.fromTo(
        $pathCircleBurstGreenCircle,
        0.7,
        { autoAlpha: 1, drawSVG: "0% 0%" },
        { drawSVG: "0% 100%" },
        "circleBurstStart"
      );

      tL.to($pathCircleBurstGreenCircle, 0.2, { autoAlpha: 0 });

      tL.fromTo(
        $pathCircleBurstRedDottedCircle,
        1,
        { autoAlpha: 1, transformOrigin: "center center" },
        { rotation: -720, ease: Sine.easeInOut },
        "-=0.2circleBurstStart"
      ).to($pathCircleBurstRedDottedCircle, 0.2, { autoAlpha: 0 });

      tL.fromTo(
        $(".sunrays"),
        0.3,
        { scale: 0, transformOrigin: "25% 25%" },
        { autoAlpha: 1, scale: 1 },
        "-=0.2circleBurstStart"
      ).to($(".sunrays"), 0.2, { autoAlpha: 0 });

      return tL;
    }

    function loadActivityBanners() {
      var tL = new TimelineMax();
      tL.staggerFromTo(
        [
          $("#gPathBannerAnalysis"),
          $("#gPathBannerGisTech"),
          $("#gPathBannerEpidemiology"),
          $("#gPathBannerEmergency")
        ],
        0.6,
        { y: -50 },
        { autoAlpha: 1, y: 10, ease: Elastic.easeOut.config(1, 0.3) },
        0.2
      );

      return tL;
    }

    function hideActivityBanners() {
      var tL = new TimelineMax();
      tL.fromTo(
        [
          $("#gPathBannerAnalysis"),
          $("#gPathBannerGisTech"),
          $("#gPathBannerEpidemiology"),
          $("#gPathBannerEmergency")
        ],
        0.2,
        { y: 10 },
        { autoAlpha: 0, y: -50, ease: Elastic.easeOut.config(1, 0.3) },
        0.2
      );

      return tL;
    }

    publicAPI.init = function() {
      masterTL = new TimelineMax({ paused: true });

      masterTL.from($svgGraspLogo, 0.2, { autoAlpha: 0 });
      masterTL.add(prepAssets());
      masterTL.add(loadSquares());
      masterTL.addLabel("SquaresLoaded");
      masterTL.add(loadCircleBursts(), "+=0.1SquaresLoaded");
      masterTL.addLabel("circleBurstsLoaded");

      masterTL.add(loadGlobe(), "-=0.3");
      masterTL.addLabel("globeLoaded");
      //4Nov2019 masterTL.add(loadMovingCircle1(), "-=0.5"); // 4Nov2019
      masterTL.add(loadSatellite1(), "-=0.6"); // 4Nov2019
      masterTL.add(loadAnalysis(), "-=0.6");
      masterTL.add(loadMap(), "-=0.6");
      masterTL.add(loadEpidem(), "-=1.2");
      masterTL.add(loadEarthquake(), "-=1.2");
      masterTL.add(changeSquaresFill(), "-=0.6");
      masterTL.add(loadActivityBanners(), "-=0.8");
      masterTL.add(hideGraspActivities());
      masterTL.add(showWords());
      masterTL.add(hideActivityBanners(), "-=0.4");
      masterTL.add(collapseGRASPBlueBackground());

      masterTL.play();

       GSDevTools.create();
    };

    return publicAPI;
  }

  return GraspIntro();
});
