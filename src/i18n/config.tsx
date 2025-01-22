// Core i18next library.
import i18n from "i18next";
// Bindings for React: allow components to
// re-render when language changes.
import { initReactI18next } from "react-i18next";

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
    lng: "ar",

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
          "Navbar":{
            "N_process": "Process",
            "N_pricing": "Pricing",
            "N_testimonials": "Testimonials",
            "N_btn_login": "Login",
            "N_company": "Company",
            "N_candidates": "Candidate",
            "N_btn_recruit": "Recruit A Talent",  
            "N_btn_demo": "Book A Demo",


          },

          "Footer": {

            "F_rights": "© 2024 recruitinn. All rights reserved.",

            "F_Product": "Product",
            "F_Community": "Community",

            "F_Packages": "Packages",
            "F_HowItWorks": "How It Works",
            "F_FAQ" : "FAQ",

            "F_Twitter": "Twitter",
            "F_Facebook": "Facebook",

            "F_Linkedin": "Linkedin",
          },

          "hero": {
            "hero_heading": "Hire Top Talent Effortlessly with RecruitInn",
            "hero_subheading": "Find and hire top talent with ease. Leverage RecruitInn’s AI-driven recruitment solutions to make your hiring process faster, more efficient, and impactful.",
            "hero_name1": "Amina Farah",
            "hero_name2": "Ethan Parker",
            "hero_profession1": "Full-Stack Developer",
            "hero_profession2": "IOS Developer",
            "string_used_by": "Used by",
            "get_started_btn": "Get Started Today",

          },
          "landingThird": {
            "talent": {
              "heading": "Connect with the Best Engineers Worldwide",
              "subheading": "Are you struggling to find top engineering talent? RecruitInn.ai makes it simple to connect with experienced professionals who can bring your vision to life. Whether you’re building an innovative product, scaling your development team, or need expertise in a specific technology stack, we match you with engineers who deliver results. Stop wasting time on endless searches—start creating impactful solutions today with trusted, highly skilled software engineers.",
              "title": "TALENTS",
            },
            "techStack": {
              "title2": "Tech Stacks",
              "heading2": "Hire Experts in Today’s Most In-Demand Technologies",
              "subheading2": "Hire Experts in Today’s Most In-Demand Technologies The tech industry evolves fast, and having access to the right talent is essential for staying ahead. At RecruitInn.ai, we connect you with specialists skilled in JavaScript, Python, Flutter, Node.js, Kubernetes, and more. Whether you're looking for mobile app developers, cloud engineers, or full-stack experts, we ensure you find professionals who align perfectly with your project needs. With RecruitInn.ai, hiring top-tier talent with the latest skills has never been easier.",

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

}
,

          "RecruitInnProcess":{
            "RP_txt1": "Real-Time Interviews, Instant Feedback, and Seamless Scheduling – All Automated for You!",
            "RP_txt2": "Effortlessly evaluate candidates, gain actionable insights, and make decisions.",
            "RP_txt3": "Our solutions cater to every expertise and project demand, ensuring a perfect Talent every time.",


          },
          "FeaturesSection":{
            "FS_heading": "Recruitinn’s Way",
            "FS_subheading": "Access a pool of meticulously vetted, highly skilled candidates ready to meet your needs and exceed your expectations."
           , "FS_content": [
            {
              "title": "Create a Job",
              "para": "Where you can specify your required skills & expertise",
            },
            {
              "title": "Generate AI Assessment",
              "para": "Where you can specify your required skills & expertise",
            },
            {
              "title": "Take Assessment",
              "para": "Where you can specify your required skills & expertise",
            },
            {
              "title": "Get The Best Talents",
              "para": "Where you can specify your required skills & expertise",
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
                  "RecruitInn.ai helped us hire top talent faster with smart automation.",
                "author": "syed Zubair Alam",
                "designation": "Founder, Co-VenTech",
                "image": "/avt1.png",
              },
              {
                id: 2,
                heading: "Hire an entire team of Developers from us.",
                message:
                  "RecruitInn.ai transformed our hiring by speeding up sourcing with AI.",
                author: "Muhammad Nameer Uddin",
                designation: "Founder, Universal Technologies",
                image: "/avt1.png",
              },
              {
                id: 3,
                heading: "Hire an entire team of Developers from us.",
                message:
                  "RecruitInn.ai sped up hiring and improved candidate quality through smart automation.",
                author: "Arshad Iqbal",
                designation: "Country Manager, Tixsee Labs LLC",
                image: "/avt1.png",
              },
              {
                id: 4,
                heading: "Hire an entire team of Developers from us.",
                message:
                  "RecruitInn.ai saved us time and helped us find top talent faster with smart automation.",
                author: "Muhammad Ahsan Khan",
                designation: "Founder, SkillBuilder",
                image: "/avt1.png",
              },
              {
                id: 5,
                heading: "Hire an entire team of Developers from us.",
                message:
                 "RecruitInn.ai revolutionized our hiring process, accelerating candidate sourcing through AI.",
                author: "Muhammad Aqib",
                designation: "Founder, Well-Tech",
                image: "/avt1.png",
              },
            ]
            
          } ,
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
          "FAQ":{
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

          "Footer": {

            "F_rights": "© 2024 recruitinn. كل الحقوق محفوظة.",

            "F_Product": "المنتج",
            "F_Community": "المجتمع",

            "F_Packages": "الباقات",
            "F_HowItWorks": "كيف يعمل",
            "F_FAQ" : "الأسئلة الشائعة",

            "F_Twitter": "تويتر",
            "F_Facebook": "فيسبوك",

            "F_Linkedin": "لينكد إن",
          },

          "Navbar":{
            "N_process": "العملية",
            "N_pricing": "التسعير",
            "N_testimonials": "الشهادات",
            "N_btn_login": "تسجيل الدخول",
            "N_company": "الشركة",
            "N_candidates": "المرشحين",
            "N_btn_recruit": "استأجر موهبة",  
            "N_btn_demo": "احجز عرضًا توضيحيًا",


          },
          "hero": {
            "hero_heading": "استأجر المواهب الأفضل بسهولة مع RecruitInn",
            "hero_subheading": "ابحث واستأجر المواهب الأفضل بسهولة. استفد من حلول التوظيف القائمة على الذكاء الاصطناعي في RecruitInn لجعل عملية التوظيف الخاصة بك أسرع وأكثر كفاءة وأثرية.",
            "hero_name1": "أمينة فرح",
            "hero_name2": "إيثان باركر",
            "hero_profession1": "مطور الويب الكامل",
            "hero_profession2": "مطور آي أو أس",
            "string_used_by": "يستخدم بواسطة",
            "get_started_btn": "ابدأ اليوم",
          },
          "landingThird": {
            "talent": {
              "heading": "اتصل بأفضل المهندسين في جميع أنحاء العالم",
              "subheading": "هل تواجه صعوبة في العثور على أفضل المواهب الهندسية؟ يجعل RecruitInn.ai من السهل الاتصال بمحترفين ذوي خبرة يمكنهم تحقيق رؤيتك. سواء كنت تقوم ببناء منتج مبتكر أو توسيع فريق التطوير الخاص بك أو تحتاج إلى خبرة في مجموعة تكنولوجيا معينة، نحن نطابقك مع مهندسين يقدمون نتائج. توقف عن إضاعة الوقت في البحث اللانهائي - ابدأ في إنشاء حلول ذات تأثير اليوم مع مهندسي برمجيات موثوقين وماهرين.",
              "title": "المواهب",
            },
            "techStack": {
              "title2": "التكنولوجيا",
              "heading2": "استئجار خبراء في أحدث التقنيات الطلوبة اليوم",
              "subheading2": "تتطور صناعة التكنولوجيا بسرعة، والوصول إلى المواهب المناسبة أمر أساسي للبقاء في المقدمة. في RecruitInn.ai، نقوم بربطك بالتخصصات المهرة في JavaScript و Python و Flutter و Node.js و Kubernetes وغيرها. سواء كنت تبحث عن مطوري تطبيقات الهاتف المحمول أو مهندسي السحابة أو خبراء الويب الكامل، نحن نضمن أن تجد محترفين يتماشون تمامًا مع احتياجات مشروعك. مع RecruitInn.ai، لم يكن توظيف المواهب من الدرجة الأولى ذات المهارات الأحدث أسهل من ذلك.",
            },
          },
         "InterviewSection": {
  "IS_heading": "حوّل طريقة التوظيف الخاصة بك",
  "IS_subheading": "قم بتبسيط عملية التوظيف باستخدام استراتيجيات متقدمة توفر أفضل المواهب وتوفر لك الوقت والموارد.",
  "IS_title": "التوظيف أسرع 5 مرات مع مقابلات ومعدلات نجاح",
  "IS_EthanClarke": "إيثان كلارك",
  "IS_EthanClarkeProfession": "مدير المنتج",
  "IS_AvaMitchell": "آفا ميتشل",
  "IS_AvaMitchellProfession": "مطور الواجهة الأمامية والخلفية",
  "IS_MiaTurner": "ميا تورنر",
  "IS_MiaTurnerProfession": "عالمة بيانات رئيسية",
  "IS_LucasBailey": "لوكاس بيلي",
  "IS_LucasBaileyProfession": "باحث ذكاء اصطناعي رئيسي",
}
,
        
          "RecruitInnProcess":{
            "RP_txt1":  "مقابلات فورية في الوقت الحقيقي، تغذية راجعة فورية، وجدولة سلسة - كلها مؤتمتة بالنسبة لك!",
            "RP_txt2":  "قيم المرشحين بسهولة، احصل على رؤى قابلة للتنفيذ، واتخذ القرارات.",
            "RP_txt3":   "تلبي حلول الخاصة بنا كل خبرة وط لب مشروع، مما يضمن موهبة مثالية في كل مرة.",


          },
          "FeaturesSection":{
            "FS_heading": "طريقة Recruitinn",
            "FS_subheading": "احصل على مجموعة من المرشحين المدققين بدقة والموهوبين بمهارات عالية مستعدين لتلبية احتياجاتك وتجاوز توقعاتك.",
            "FS_content": [

            {
              "title":  "إنشاء وظيفة",
              "para":  "حيث يمكنك تحديد المهارات والخبرات المطلوبة",
            },
            {
              "title": "إنشاء تقييم AI",
              "para":  "حيث يمكنك تحديد المهارات والخبرات المطلوبة",
            },
            {
              "title":  "أخذ التقييم",
              "para":  "حيث يمكنك تحديد المهارات والخبرات المطلوبة",
            },
            {
              "title":  "الحصول على أفضل المواهب",
              "para":  "حيث يمكنك تحديد المهارات والخبرات المطلوبة",
            },
           ],
          },
          "Testimonials": {
            "T_heading": "الشهادات",
            "T_subheading": "لا تأخذ كلماتنا لها. إليك ما يقوله الآخرون عنا.",
            "T_content": [
              {
                "id": 1,
                "heading": "استأجر فريقًا كاملاً من المطورين منا.",
                "message":
                  "ساعدتنا RecruitInn.ai في توظيف المواهب الأفضل بشكل أسرع باستخدام الأتمتة الذكية.",
                "author": "سيد زبير عالم",
                "designation": "مؤسس، Co-VenTech",
                "image": "/avt1.png", 
              },
              {
                "id": 2,
                "heading": "استأجر فريقًا كاملاً من المطورين منا.",
                message: "قامت RecruitInn.ai بتحويل عملية التوظيف لدينا من خلال تسريع التوظيف بواسطة الذكاء الاصطناعي.",
                  
                author: "محمد نمير الدين",
                designation: "مؤسس، Universal Technologies",
                image: "/avt1.png",
              },
              {
                id: 3,
                heading: "استأجر فريقًا كاملاً من المطورين منا.",
                message:
                  "سرع RecruitInn.ai التوظيف وتحسين جودة المرشحين من خلال الأتمتة الذكية.",
                author: "أرشد اقبال",
                designation: "مدير البلد، Tixsee Labs LLC",
                image: "/avt1.png",
              },
              {
                id: 4,
                heading: "استأجر فريقًا كاملاً من المطورين منا.",
                message:
                  "قامت RecruitInn.ai بتوفير الوقت لدينا وساعدتنا في العثور على المواهب الأفضل بشكل أسرع باستخدام الأتمتة الذكية.",
                author: "محمد احسان خان",
                designation: "مؤسس، SkillBuilder",
                image: "/avt1.png",
              },
              {
                id: 5,
                heading: "استأجر فريقًا كاملاً من المطورين منا.",
                message:
                 "قامت RecruitInn.ai بتحويل عملية التوظيف لدينا، مما أسرع عملية البحث عن المرشحين من خلال الذكاء الاصطناعي.",
                author: "محمد عقيب",
                designation: "مؤسس، Well-Tech",
                image: "/avt1.png",
              },
            ]
            
            
          } ,
        
            "Packages": {
              "P_heading": "الباقات",
              "P_subheading": "خيارات التسعير المرنة لدينا مصممة لتلبية احتياجاتك",
              "P_month": "/شهر",
              "WhatsIncluded": "ما يتضمنه",
              "P_btn": "ابدأ اليوم",
              
          
              //package 1
              "P1_heading": "كل ما تحتاجه لتعزيز إنتاجيتك",
              "P1_price": "0",
              "P1_packageType": "مجاني",
              "P1_reports": "4 تقارير للمرشحين",
              "P1_dashboard": "لوحة تحكم بالتحليلات الأساسية",
              "P1_support": "دعم عبر البريد الإلكتروني",
          
              //package 2
              "P2_heading": "كل ما تحتاجه لتعزيز إنتاجيتك",
              "P2_price": "75",
              "P2_packageType": "المبتدئين",
              "P2_reports": "25 تقريرًا للمرشحين",
              "P2_dashboard": "لوحة تحكم متقدمة بالتحليلات",
              "P2_support": "دعم عبر البريد الإلكتروني",
          
              //package 3
              "P3_heading": "كل ما تحتاجه لتعزيز إنتاجيتك",
              "P3_price": "250",
              "P3_packageType": "النمو",
              "P3_reports": "100 تقرير للمرشحين",
              "P3_dashboard": "لوحة تحكم متقدمة بالتحليلات",
              "P3_support": "دعم أولوي عبر البريد الإلكتروني",
          
              //package 4
              "P4_heading": "كل ما تحتاجه لتعزيز إنتاجيتك",
              "P4_price": "500",
              "P4_packageType": "الشركات",
              "P4_reports": "250 تقريرًا للمرشحين",
              "P4_dashboard": "دعم أولوي عبر الهاتف والبريد الإلكتروني",
              "P4_support": "مدير حساب مخصص"
            },
          
          "FAQ": {
  "F_heading": "الأسئلة الشائعة",
  "F_subheading": "إجابات على الأسئلة الأكثر شيوعًا.",
  "F_Q1": "ما هو Recruitinn؟",
  "F_A1": "Recruitinn هو منصة توظيف متقدمة تربط الشركات بأفضل المهندسين والمطورين. تعتمد تقنيتنا المدعومة بالذكاء الاصطناعي على تبسيط عملية التوظيف من خلال توفير اختبارات تقييم شاملة ومطابقة مخصصة، مما يضمن العثور على المرشحين المثاليين لاحتياجاتك الخاصة.",
  
  "F_Q2": "كيف يجري RecruitInn.ai مقابلات قائمة على الذكاء الاصطناعي؟",
  "F_A2": "يستخدم RecruitInn.ai خوارزميات ذكاء اصطناعي متقدمة لإجراء المقابلات من خلال تحليل استجابات المرشحين وثقتهم ومهاراتهم الشخصية. يقوم بتقييم أداء المرشح في الوقت الفعلي ويقدم تقارير مفصلة للمُجندين أو المرشحين.",
  
  "F_Q3": "هل يمكن لـ RecruitInn.ai تقييم المهارات التقنية والشخصية؟",
  "F_A3": "نعم، يقوم RecruitInn.ai بتقييم كل من المهارات التقنية (مثل البرمجة وحل المشكلات) والمهارات الشخصية (مثل التواصل والتفكير النقدي والعمل الجماعي) خلال عملية المقابلة. يوفر الأداة رؤى شاملة لمساعدة المُجندين على اتخاذ قرارات أفضل.",
  
  "F_Q4": "هل يمكن لـ RecruitInn.ai التكيف مع أي وصف وظيفي؟",
  "F_A4": "نعم، تم تصميم RecruitInn.ai للعمل مع أي وصف وظيفي حول العالم، مما يضمن تقييمًا دقيقًا للمرشحين بغض النظر عن الدور.",
  
  "F_Q5": "كيف أبدأ باستخدام RecruitInn.ai؟",
  "F_A5": "البدء مع RecruitInn.ai سهل. اختر الخطة التي تناسب احتياجاتك، وقم بالتسجيل، وستكون على استعداد لتغيير عملية التوظيف الخاصة بك."
}

        },
      },
    },
  });

export default i18n;