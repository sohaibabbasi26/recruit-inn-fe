// Core i18next library.
import i18n from "i18next";
// Bindings for React: allow components to
// re-render when language changes.
import { initReactI18next } from "react-i18next";

const savedLanguage =
  typeof window !== "undefined" && localStorage.getItem("language")
    ? localStorage.getItem("language")
    : "en";
i18n
  // Add React bindings as a plugin.
  .use(initReactI18next)
  // Initialize the i18next instance.
  .init({
    // Config options

    // Specifies the default language (locale) used
    // when a user visits our site for the first time.
    // We use English here, but feel free to use
    // whichever locale you want.                   
    lng: savedLanguage,

    // Fallback locale used when a translation is
    // missing in the active locale. Again, use your
    // preferred locale here. 
    fallbackLng: "en",

    // Enables useful output in the browser’s
    // dev console.
    debug: true,

    // Normally, we want `escapeValue: true` as it
    // ensures that i18next escapes any code in
    // translation messages, safeguarding against
    // XSS (cross-site scripting) attacks. However,
    // React does this escaping itself, so we turn 
    // it off in i18next.
    interpolation: {
      escapeValue: false,
    },

    // Translation messages. Add any languages
    // you want here.
    resources: {
      // English
      en: {
        // `translation` is the default namespace.
        // More details about namespaces shortly.
        translation: {
          "Navbar": {
            "N_process": "Process",
            "N_pricing": "Pricing",
            "N_testimonials": "Testimonials",
            "N_btn_login": "Login",
            "N_company": "Hire Talent",
            "N_candidates": "Get Hired",
            "N_btn_recruit": "Hire Top Talent",
            "N_btn_demo": "Book A Demo",
            "N_btn_loginasClient": "Login as Client",
            "N_btn_loginasCandidate": "Login as Candidate",


          },

          "Footer": {

            "F_rights": "© 2024 recruitinn. All rights reserved.",

            "F_Product": "Product",
            "F_Community": "Community",

            "F_Packages": "Packages",
            "F_HowItWorks": "How It Works",
            "F_FAQ": "FAQ",

            "F_Twitter": "Twitter",
            "F_Facebook": "Facebook",

            "F_Linkedin": "Linkedin",
          },

          "hero": {
            "hero_heading": "Welcome to the Future of Recruitment",
            "hero_subheading": "Transform your hiring process with RecruitInn's AI-powered solutions. Discover, assess, and onboard top talent faster, smarter, and with unmatched efficiency.",
            "hero_name1": "Amina Farah",
            "hero_name2": "Ethan Parker",
            "hero_profession1": "Full-Stack Developer",
            "hero_profession2": "IOS Developer",
            "string_used_by": "Trusted by",
            "get_started_btn": "Get Started Today",

          },
          "landingThird": {
            "talent": {
              "heading": "Connect with the Best Engineers Worldwide",
              "subheading": "Struggling to hire skilled engineers? RecruitInn.ai connects you with top professionals who can bring your vision to reality, whether you need help scaling your team, building a product, or finding expertise in a specific tech stack. Skip the endless search and get matched with engineers who deliver real results.",
              "title": "TALENTS",
            },
            "techStack": {
              "title2": "Tech Stacks",
              "heading2": "Hire Experts in Today’s Most In-Demand Technologies",
              "subheading2": "Tech evolves fast, and the right talent makes all the difference. RecruitInn.ai helps you find specialists in JavaScript, Python, Flutter, Node.js, Kubernetes, and more. Whether you need mobile app developers, cloud engineers, or full-stack experts. Hiring top-tier talent has never been easier.",

            },

          },
          "InterviewSection": {
            "IS_heading": "Transform the Way You Hire",
            "IS_subheading": "Simplify recruitment with advanced strategies that deliver top talent while saving you time and resources.",
            "IS_title": "Hire 5x faster Interview and Pass Rate",
            "IS_EthanClarke": "Ethan Clarke",
            "IS_EthanClarkeProfession": "Product Manager",
            "IS_AvaMitchell": "Ava Mitchell",
            "IS_AvaMitchellProfession": "Full-Stack Developer",
            "IS_MiaTurner": "Mia Turner",
            "IS_MiaTurnerProfession": "Lead Data Scientist",
            "IS_LucasBailey": "Lucas Bailey",
            "IS_LucasBaileyProfession": "Lead AI Researcher",
            "IS_TopTalent": "Top Talent",

          }
          ,

          "RecruitInnProcess": {
            "RP_txt1": "AI-Driven Candidate Reports offer instant insights into technical and soft skills, with AI-powered recommendations for the best fit.",
            "RP_txt2": " Custom Job Creation lets clients define roles, add skills, and create AI-driven interviews. ",
            "RP_txt3": "Real-Time Coding Assessments evaluate technical skills through interactive tests.",


          },
          "FeaturesSection": {
            "FS_heading": "Effortless Hiring in Four Simple Steps",
            "FS_subheading": "Access a pool of meticulously vetted, highly skilled candidates ready to meet your needs and exceed your expectations."
            , "FS_content": [
              {
                "title": "Create a Job",
                "para": "Share the details of the role and the skills you need.",
              },
              {
                "title": "Generate AI Interview",
                "para": "Let our AI create the perfect interview for your candidates.",
              },
              {
                "title": "Conduct the Interview",
                "para": "Use AI to interview and evaluate candidates with ease.",
              },
              {
                "title": "Hire the Right Talent",
                "para": "Choose the best candidate and grow your team effortlessly.",
              },
            ],
          },
          "Testimonials": {
            "T_heading": "Testimonials",
            "T_subheading": "Don’t take our words for it. Here’s what others have to say about us.",
            "T_content": [
              {
                "id": 1,
                "heading": "Hire an entire team of Developers from us.",
                "message":
                  "RecruitInn.ai delivered outstanding results, simplifying our hiring process and letting us focus on top candidates effortlessly.",
                "author": "syed Zubair Alam",
                "designation": "Founder, Co-VenTech",
                "image": "/avt1.png",
              },
              {
                id: 2,
                heading: "Hire an entire team of Developers from us.",
                message:
                  "With the help of RecruitInn.ai we were able to transform the way we approached hiring. The entire process became faster and more efficient."



                ,
                author: "Muhammad Nameer Uddin",
                designation: "Founder, Universal Technologies",
                image: "/avt15.png",
              },
              {
                id: 3,
                heading: "Hire an entire team of Developers from us.",
                message:
                  "We saw incredible results with RecruitInn.ai’s seamless hiring process. It allowed us to focus on evaluating top candidates without the usual hassle.",
                author: "Arshad Iqbal",
                designation: "Country Manager, Tixsee Labs LLC",
                image: "/avt12.png",
              },
              {
                id: 4,
                heading: "Hire an entire team of Developers from us.",
                message:
                  "Finding the right people for our team was never this simple. RecruitInn.ai made sure we had the best talent in no time.",
                author: "Muhammad Ahsan Khan",
                designation: "Founder, SkillBuilder",
                image: "/avt13.png",
              },
              {
                id: 5,
                heading: "Hire an entire team of Developers from us.",
                message:
                  "RecruitInn.ai transformed our hiring process, dramatically speeding up candidate sourcing with advanced AI.",
                author: "Muhammad Aqib",
                designation: "Founder, Well-Tech",
                image: "/avt14.png",
              },
            ]

          },
          "Packages": {
            "P_heading": "Packages",
            "P_subheading": "Our flexible pricing options are tailored to your needs",
            "P_month": "/month",
            "WhatsIncluded": "What's Included",
            "P_btn": "Get Started",


            //package 1
            "P1_heading": "Everything you need to supercharge your productivity",
            "P1_price": "0",
            "P1_packageType": "Free",
            "P1_reports": "4 reports of candidates",
            "P1_dashboard": "Basic analytics dashboard",
            "P1_support": "Email support",


            //package 2
            "P2_heading": "Everything you need to supercharge your productivity",
            "P2_price": "75",
            "P2_packageType": "Starter",
            "P2_reports": "25 reports of candidates",
            "P2_dashboard": "Advanced analytics dashboard",
            "P2_support": "Email support",

            //package 3
            "P3_heading": "Everything you need to supercharge your productivity",
            "P3_price": "250",
            "P3_packageType": "Growth",
            "P3_reports": "100 reports of candidates",
            "P3_dashboard": "Advanced analytics dashboard",
            "P3_support": "Priority email support",

            //package 4
            "P4_heading": "Everything you need to supercharge your productivity",
            "P4_price": "500",
            "P4_packageType": "Enterprise",
            "P4_reports": "250 reports of candidates",
            "P4_dashboard": "Priority phone and email support",
            "P4_support": "Dedicated account manager",


          },
          "FAQ": {
            "F_heading": "FAQs",
            "F_subheading": "Answers to the most frequently asked questions.",
            "F_Q1": "What is recruitinn?",
            "F_A1": "Recruitinn is an advanced recruitment platform that connects businesses with top engineers and developers. Our advanced AI-driven technology streamlines the hiring process by offering comprehensive assessment tests and personalized matching, ensuring that you find the perfect candidates for your specific needs.",

            "F_Q2": "How does RecruitInn.ai conduct AI-based interviews?",
            "F_A2": "RecruitInn.ai uses advanced AI algorithms to conduct interviews by analyzing candidates' responses, confidence, and soft skills. It evaluates the candidate's performance in real-time and provides detailed reports to recruiters or candidates.",

            "F_Q3": "Can RecruitInn.ai evaluate both technical and soft skills?",
            "F_A3": "Yes, RecruitInn.ai evaluates both technical skills (like coding, problem-solving, etc.) and soft skills (like communication, critical thinking, and teamwork) during the interview process. The tool provides comprehensive insights to help recruiters make better decisions.",

            "F_Q4": "Can Recruitinn.ai adapt to any job description?",
            "F_A4": "Yes, Recruitinn.ai is built to work with any job description worldwide, ensuring precise candidate evaluation irrespective of the role.",

            "F_Q5": "How do I get started with Recruitinn.ai ?",
            "F_A5": "Getting started with Recruitinn.ai is simple. Choose a plan that suits your needs, sign up, and you’ll be on your way to revolutionizing your hiring process.",


          }

        },

      },
      // Arabic
      ar: {
        translation: {
          "Navbar": {
            "N_process": "العملية",
            "N_pricing": "التسعير",
            "N_testimonials": "آراء العملاء",
            "N_btn_login": "تسجيل الدخول",
            "N_company": "توظيف المواهب",
            "N_candidates": "احصل على وظيفة",
            "N_btn_recruit": "توظيف أفضل المواهب",
            "N_btn_demo": "حجز عرض توضيحي",
            "N_btn_loginasClient": "تسجيل الدخول كعميل",
            "N_btn_loginasCandidate": "تسجيل الدخول كمرشح"
            ,
          },

          "Footer": {
            "F_rights": "© 2024 recruitinn. جميع الحقوق محفوظة.",
            "F_Product": "المنتج",
            "F_Community": "المجتمع",
            "F_Packages": "الباقات",
            "F_HowItWorks": "كيف يعمل",
            "F_FAQ": "الأسئلة الشائعة",
            "F_Twitter": "تويتر",
            "F_Facebook": "فيسبوك",
            "F_Linkedin": "لينكدإن"
          }
          ,


          "hero": {
            "hero_heading": "مرحبًا بك في مستقبل التوظيف",
            "hero_subheading": "حوّل عملية التوظيف الخاصة بك باستخدام حلول RecruitInn المدعومة بالذكاء الاصطناعي. اكتشف، قيّم، وقم بتوظيف أفضل المواهب بسرعة وذكاء وكفاءة لا مثيل لها.",
            "hero_name1": "أمينة فراح",
            "hero_name2": "إيثان باركر",
            "hero_profession1": "مطورة متكاملة",
            "hero_profession2": "مطور iOS",
            "string_used_by": "موثوق من قبل",
            "get_started_btn": "ابدأ اليوم"
          },
          "landingThird": {
            "talent": {
              "heading": "اتصل بأفضل المهندسين حول العالم",
              "subheading":" تواجه صعوبة في توظيف مهندسين مهرة؟ يربطك **RecruitInn.ai** بأفضل المحترفين لتحقيق رؤيتك، سواء كنت بحاجة لتوسيع فريقك، بناء منتج، أو العثور على خبراء في تقنية معينة. تجاوز البحث المطول واحصل على مهندسين يحققون نتائج حقيقية.",
              "title": "المواهب"
            },
            "techStack": {
              "title2": "تقنيات التكنولوجيا",
              "heading2": "وظّف خبراء في أكثر التقنيات المطلوبة اليوم",
              "subheading2": "التقنية تتطور بسرعة، والمواهب المناسبة تصنع الفرق. RecruitInn.ai يساعدك في العثور على متخصصين في JavaScript, Python, Flutter, Node.js, Kubernetes والمزيد. سواء كنت بحاجة إلى مطوري تطبيقات، مهندسي سحابة، أو خبراء Full-Stack، أصبح توظيف الكفاءات أسهل من أي وقت مضى."
            }
          }


          ,

          "InterviewSection": {
            "IS_heading": "حوّل طريقة التوظيف الخاصة بك",
            "IS_subheading": "بسّط عملية التوظيف باستخدام استراتيجيات متقدمة توفر أفضل المواهب مع توفير الوقت والموارد.",
            "IS_title": "وظّف أسرع بخمس مرات مع مقابلات ونسبة نجاح مرتفعة",
            "IS_EthanClarke": "إيثان كلارك",
            "IS_EthanClarkeProfession": "مدير منتج",
            "IS_AvaMitchell": "آفا ميتشل",
            "IS_AvaMitchellProfession": "مطورة متكاملة",
            "IS_MiaTurner": "ميا تورنر",
            "IS_MiaTurnerProfession": "عالمة بيانات رئيسية",
            "IS_LucasBailey": "لوكاس بيلي",
            "IS_LucasBaileyProfession": "باحث رئيسي في الذكاء الاصطناعي",
            "IS_TopTalent": "المواهب الأفضل",
          },
          "RecruitInnProcess": {
            "RP_txt1": "تقارير المرشحين المدعومة بالذكاء الاصطناعي توفر رؤى فورية حول المهارات التقنية والشخصية، مع توصيات ذكية لأفضل تطابق.",
            "RP_txt2": "إنشاء الوظائف المخصص يمكّن العملاء من تحديد الأدوار، وإضافة المهارات، وإنشاء مقابلات مدعومة بالذكاء الاصطناعي.",
            "RP_txt3": "تقييمات البرمجة الفورية تقيس المهارات التقنية عبر اختبارات تفاعلية."
          },

          "FeaturesSection": {
            "FS_heading": "توظيف سهل في أربع خطوات بسيطة",
            "FS_subheading": "احصل على مجموعة من المرشحين المميزين بدقة وعناية، والذين يمتلكون المهارات اللازمة لتلبية احتياجاتك وتجاوز توقعاتك.",
            "FS_content": [
              {
                "title": "إنشاء وظيفة",
                "para": "شارك تفاصيل الدور والمهارات التي تحتاجها."
              },
              {
                "title": "إنشاء مقابلة باستخدام الذكاء الاصطناعي",
                "para": "دع الذكاء الاصطناعي ينشئ المقابلة المثالية لمرشحيك."
              },
              {
                "title": "إجراء المقابلة",
                "para": "استخدم الذكاء الاصطناعي لإجراء وتقييم المرشحين بسهولة."
              },
              {
                "title": "وظّف المواهب المناسبة",
                "para": "اختر أفضل مرشح وقم بتطوير فريقك بسهولة."
              }
            ]
          }
          ,

          "Testimonials": {
            "T_heading": "آراء العملاء",
            "T_subheading": "لا تأخذ كلامنا فقط، إليك ما يقوله الآخرون عنا.",
            "T_content": [
              {
                "id": 1,
                "heading": "وظّف فريقًا كاملاً من المطورين من خلالنا.",
                "message": "قدمت RecruitInn.ai نتائج رائعة، حيث بسّطت عملية التوظيف لدينا وجعلتنا نركز على أفضل المرشحين بسهولة.",
                "author": "سيد زبير عالم",
                "designation": "المؤسس، Co-VenTech",
                "image": "/avt1.png"
              },
              {
                "id": 2,
                "heading": "وظّف فريقًا كاملاً من المطورين من خلالنا.",
                "message": "بفضل RecruitInn.ai، تمكّنا من تغيير طريقة تعاملنا مع التوظيف. أصبح الأمر أسرع وأكثر كفاءة.",
                "author": "محمد نمير الدين",
                "designation": "المؤسس، Universal Technologies",
                "image": "/avt1.png"
              },
              {
                "id": 3,
                "heading": "وظّف فريقًا كاملاً من المطورين من خلالنا.",
                "message": "حققنا نتائج مذهلة مع عملية التوظيف السلسة لـ RecruitInn.ai. سمح لنا ذلك بالتركيز على تقييم أفضل المرشحين دون عناء.",
                "author": "أرشاد إقبال",
                "designation": "مدير الدولة، Tixsee Labs LLC",
                "image": "/avt1.png"
              },
              {
                "id": 4,
                "heading": "وظّف فريقًا كاملاً من المطورين من خلالنا.",
                "message": "لم يكن العثور على الأشخاص المناسبين لفريقنا بهذه البساطة من قبل. جعلت RecruitInn.ai من السهل ضمان وجود أفضل المواهب في وقت قصير.",
                "author": "محمد أحسن خان",
                "designation": "المؤسس، SkillBuilder",
                "image": "/avt1.png"
              },
              {
                "id": 5,
                "heading": "وظّف فريقًا كاملاً من المطورين من خلالنا.",
                "message": "حولت RecruitInn.ai عملية التوظيف لدينا، حيث سرعت بشكل كبير من العثور على المرشحين باستخدام الذكاء الاصطناعي المتقدم.",
                "author": "محمد عاقب",
                "designation": "المؤسس، Well-Tech",
                "image": "/avt1.png"
              }
            ]
          }
          ,


          "Packages": {
            "P_heading": "الباقات",
            "P_subheading": "خيارات تسعيرنا المرنة مصممة لتلبية احتياجاتك",
            "P_month": "/شهر",
            "WhatsIncluded": "ما الذي يتضمنه",
            "P_btn": "ابدأ الآن",

            //package 1
            "P1_heading": "كل ما تحتاجه لتعزيز إنتاجيتك",
            "P1_price": "0",
            "P1_packageType": "مجاني",
            "P1_reports": "4 تقارير للمرشحين",
            "P1_dashboard": "لوحة تحليلات أساسية",
            "P1_support": "دعم عبر البريد الإلكتروني",

            //package 2
            "P2_heading": "كل ما تحتاجه لتعزيز إنتاجيتك",
            "P2_price": "75",
            "P2_packageType": "البداية",
            "P2_reports": "25 تقريرًا للمرشحين",
            "P2_dashboard": "لوحة تحليلات متقدمة",
            "P2_support": "دعم عبر البريد الإلكتروني",

            //package 3
            "P3_heading": "كل ما تحتاجه لتعزيز إنتاجيتك",
            "P3_price": "250",
            "P3_packageType": "النمو",
            "P3_reports": "100 تقرير للمرشحين",
            "P3_dashboard": "لوحة تحليلات متقدمة",
            "P3_support": "دعم أولوي عبر البريد الإلكتروني",

            //package 4
            "P4_heading": "كل ما تحتاجه لتعزيز إنتاجيتك",
            "P4_price": "500",
            "P4_packageType": "المؤسسات",
            "P4_reports": "250 تقريرًا للمرشحين",
            "P4_dashboard": "دعم هاتفي وبريد إلكتروني أولوي",
            "P4_support": "مدير حساب مخصص"
          }
          ,

          
            "FAQ": {
              "F_heading": "الأسئلة الشائعة",
              "F_subheading": "إجابات على الأسئلة الأكثر شيوعًا.",
              "F_Q1": "ما هو Recruitinn؟",
              "F_A1": "Recruitinn هو منصة توظيف متقدمة تربط الشركات بأفضل المهندسين والمطورين. تسهّل تقنيتنا المتقدمة المعتمدة على الذكاء الاصطناعي عملية التوظيف من خلال تقديم اختبارات تقييم شاملة ومطابقة مخصصة، مما يضمن العثور على المرشحين المثاليين لتلبية احتياجاتك المحددة.",
          
              "F_Q2": "كيف تُجري RecruitInn.ai مقابلات باستخدام الذكاء الاصطناعي؟",
              "F_A2": "تستخدم RecruitInn.ai خوارزميات ذكاء اصطناعي متقدمة لإجراء المقابلات من خلال تحليل ردود المرشحين، وثقتهم، ومهاراتهم الشخصية. يتم تقييم أداء المرشح في الوقت الفعلي وتقديم تقارير مفصلة للمسؤولين عن التوظيف أو المرشحين.",
          
              "F_Q3": "هل يمكن لـ RecruitInn.ai تقييم المهارات التقنية والشخصية معًا؟",
              "F_A3": "نعم، تقوم RecruitInn.ai بتقييم المهارات التقنية (مثل البرمجة، وحل المشكلات، وغيرها) والمهارات الشخصية (مثل التواصل، والتفكير النقدي، والعمل الجماعي) أثناء عملية المقابلة. يوفر الأداة رؤى شاملة لمساعدة المسؤولين عن التوظيف على اتخاذ قرارات أفضل.",
          
              "F_Q4": "هل يمكن لـ RecruitInn.ai التكيف مع أي وصف وظيفي؟",
              "F_A4": "نعم، تم تصميم RecruitInn.ai للعمل مع أي وصف وظيفي حول العالم، مما يضمن تقييمًا دقيقًا للمرشحين بغض النظر عن الدور.",
          
              "F_Q5": "كيف أبدأ مع RecruitInn.ai؟",
              "F_A5": "البدء مع RecruitInn.ai بسيط. اختر الخطة التي تناسب احتياجاتك، قم بالتسجيل، وستكون في طريقك إلى تحسين عملية التوظيف الخاصة بك."
            }
          },
          

         
        
      }

    },
  });


export default i18n;