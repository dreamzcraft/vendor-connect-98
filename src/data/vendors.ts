export interface Vendor {
  name: string;
  email: string;
  phone: string;
  type: "company_rep" | "distributor";
}

export interface Brand {
  name: string;
  vendors: Vendor[];
}

export interface ProductCategory {
  id: string;
  name: string;
  icon: string;
  brands: Brand[];
}

function v(name: string, email: string, phone: string, type: "company_rep" | "distributor" = "distributor"): Vendor {
  return { name, email, phone, type };
}

export const productCategories: ProductCategory[] = [
  {
    id: "laptop",
    name: "Laptop",
    icon: "💻",
    brands: [
      {
        name: "HP",
        vendors: [
          v("Yugant Vashishth", "yugant.vashistha1@hp.com", "9718171390", "company_rep"),
          v("Hemant Dable", "hemant.dable@hp.com", "8939820400", "company_rep"),
          v("Tara Dutt (Savex)", "taradutt.gaur@savex.in", "9760903030"),
          v("Abhishek (Redington)", "abhishek.pundir@redingtongroup.com", "8950705420"),
          v("Anshul Sharma (Rashi)", "anshul.sharma@rptechindia.com", "7055112518"),
        ],
      },
      {
        name: "Dell",
        vendors: [
          v("Joshi Amrit", "amrit.joshi@dell.com", "9148363063", "company_rep"),
          v("Manish Bahuguna (Redington)", "manish.bahuguna@redingtongroup.com", "9358106096"),
          v("Vivek Aggarwal (Supertron)", "vivek.agarwal@supertronindia.com", "7579083080"),
          v("Abhishek Rathore (Rashi)", "abhishek.rathore@rptechindia.com", "7055112517"),
        ],
      },
      {
        name: "Lenovo",
        vendors: [
          v("Naveen Jha", "njha2@lenovo.com", "8696902736", "company_rep"),
          v("Vijay (Savex)", "Vijaypal.chauhan@savex.in", "9897784267"),
          v("Inder Pal (Rashi)", "indarjeet.pal@rptechindia.com", "8791332216"),
        ],
      },
      {
        name: "Acer",
        vendors: [
          v("Devendra Raghuvanshi", "devendra.raghuvanshi@acersales.net", "9927006713", "company_rep"),
          v("Vivek Aggarwal (Supertron)", "vivek.agarwal@supertronindia.com", "7579083080"),
        ],
      },
      {
        name: "Asus",
        vendors: [
          v("Rahul Kumar", "rahul_kumar@asus.com", "9758195827", "company_rep"),
          v("Inder Pal (Rashi)", "indarjeet.pal@rptechindia.com", "8791332216"),
          v("Atul (Supertron)", "atul.dun@supertronindia.com", "8941931954"),
        ],
      },
      {
        name: "MSI",
        vendors: [
          v("Sagar Saxena", "sagars@msi.com", "9384067885", "company_rep"),
          v("Sunil Negi (Redington)", "sunil.negi@redingtongroup.com", "9760010058"),
          v("MSI Brand Store Dehradun", "ranadk655@gmail.com", "7060372549"),
          v("Shekhar (Sadhna Enterprises)", "infoshekhar2015@gmail.com", "9013313801"),
        ],
      },
      {
        name: "Apple",
        vendors: [
          v("Nitin Bakshi (Ingram Micro)", "Nitin.Bakshi@ingrammicro.com", "9034872500"),
          v("Irshad (Radius Systems)", "irshad@radiussystems.net", "9760025986"),
        ],
      },
      {
        name: "Samsung",
        vendors: [
          v("Shailendra Kumar Dwivedi", "shailendra.d@samsung.com", "9935099444", "company_rep"),
          v("Vivek Aggarwal (Supertron)", "vivek.agarwal@supertronindia.com", "7579083080"),
        ],
      },
    ],
  },
  {
    id: "desktop",
    name: "Desktop / AIO",
    icon: "🖥️",
    brands: [
      {
        name: "HP",
        vendors: [
          v("Yugant Vashishth", "yugant.vashistha1@hp.com", "9718171390", "company_rep"),
          v("Hemant Dable", "hemant.dable@hp.com", "8939820400", "company_rep"),
          v("Tara Dutt (Savex)", "taradutt.gaur@savex.in", "9760903030"),
          v("Abhishek (Redington)", "abhishek.pundir@redingtongroup.com", "8950705420"),
          v("Vaibhav Jain (Enfotech)", "vaibhav@enfotechindia.com", "8368131343"),
        ],
      },
      {
        name: "Dell",
        vendors: [
          v("Joshi Amrit", "amrit.joshi@dell.com", "9148363063", "company_rep"),
          v("Manish Bahuguna (Redington)", "manish.bahuguna@redingtongroup.com", "9358106096"),
          v("Vivek Aggarwal (Supertron)", "vivek.agarwal@supertronindia.com", "7579083080"),
          v("Abhishek Rathore (Rashi)", "abhishek.rathore@rptechindia.com", "7055112517"),
        ],
      },
      {
        name: "Lenovo",
        vendors: [
          v("Naveen Jha", "njha2@lenovo.com", "8696902736", "company_rep"),
          v("Vijay (Savex)", "Vijaypal.chauhan@savex.in", "9897784267"),
          v("Inder Pal (Rashi)", "indarjeet.pal@rptechindia.com", "8791332216"),
        ],
      },
      {
        name: "Acer",
        vendors: [
          v("Devendra Raghuvanshi", "devendra.raghuvanshi@acersales.net", "9927006713", "company_rep"),
          v("Vivek Aggarwal (Supertron)", "vivek.agarwal@supertronindia.com", "7579083080"),
        ],
      },
      {
        name: "Asus",
        vendors: [
          v("Rahul Kumar", "rahul_kumar@asus.com", "9758195827", "company_rep"),
          v("Inder Pal (Rashi)", "indarjeet.pal@rptechindia.com", "8791332216"),
        ],
      },
    ],
  },
  {
    id: "firewall",
    name: "Firewall",
    icon: "🛡️",
    brands: [
      {
        name: "Fortinet (FortiGate)",
        vendors: [
          v("Praveen Pathak", "ppathak@fortinet.com", "9910417177", "company_rep"),
          v("Nishant Verma", "verman@fortinet.com", "9899944118", "company_rep"),
          v("Vinesh (Savex)", "Vinesh.meena@savex.in", "8439093010"),
          v("Samuel Raj (Redington)", "samuel.raj@redingtongroup.com", ""),
          v("Hemant Srivastava (TechTune)", "hemant@techtunenet.com", "9220911318"),
          v("Sanya Chauhan (TC Infotech)", "sanya@tcinfotech.com", "8800740002"),
        ],
      },
      {
        name: "Palo Alto",
        vendors: [
          v("Nitin Virmani", "Nvirmani@paloaltonetworks.com", "8800581962", "company_rep"),
          v("Manish Bahuguna (Redington)", "manish.bahuguna@redingtongroup.com", "9358106096"),
        ],
      },
      {
        name: "Checkpoint",
        vendors: [
          v("Abhishek Srivastava", "abhisheksr@checkpoint.com", "8800945387", "company_rep"),
          v("Chandar Mohan", "chanderm@checkpoint.com", "9815187867", "company_rep"),
          v("Rakesh K V (Check Point)", "rakeshkv@checkpoint.com", "9886811655"),
          v("Kapil Yadav (Savex)", "kapil.yadav@savex.in", "9977243733"),
        ],
      },
      {
        name: "Cisco",
        vendors: [
          v("Anudeep Parasar", "anudpara@cisco.com", "9958598485", "company_rep"),
          v("Kanchi Mehta (HT Tech)", "kanchi@httechnologies.co.in", "8356967031"),
          v("Mohd. Haroon (Avion)", "haroon@avionnetwork.co.in", "8368277328"),
          v("Prem (KHM Technology)", "sales2@khmtechnologies.com", "9716831178"),
          v("Hemant Srivastava (TechTune)", "hemant@techtunenet.com", "9220911318"),
        ],
      },
      {
        name: "Sophos",
        vendors: [
          v("Chetan Tripathi", "Chetan.Tripathi@Sophos.com", "9918772777", "company_rep"),
          v("Ankur Tandon", "ankur.tandon@sophos.com", "9984549525", "company_rep"),
          v("Puneet (Docket Care)", "puneet@docketcare.com", "6388906977"),
          v("Hemant Srivastava (TechTune)", "hemant@techtunenet.com", "9220911318"),
        ],
      },
      {
        name: "SonicWall",
        vendors: [
          v("Sanjeev Dhiman", "sdhiman@gmail.com", "9956242555", "company_rep"),
          v("Roopa Sanghavi (Technofirm)", "roopa@technofirm.in", "9377722800"),
          v("Parth Mehta (HT Tech)", "parth@httechnologies.co.in", "9137736489"),
        ],
      },
      {
        name: "Juniper Networks",
        vendors: [
          v("T.P.Bharathi", "tbharathi@juniper.net", "", "company_rep"),
          v("Hemant Srivastava (TechTune)", "hemant@techtunenet.com", "9220911318"),
        ],
      },
      {
        name: "F5 Networks",
        vendors: [
          v("Atul Arora", "a.arora@f5.com", "9650041929", "company_rep"),
        ],
      },
      {
        name: "Gajshield",
        vendors: [
          v("Sayali Basutkar", "sayali@gajshield.com", "8082761781", "company_rep"),
          v("Manish Bahuguna (Redington)", "manish.bahuguna@redingtongroup.com", "9358106096"),
        ],
      },
    ],
  },
  {
    id: "workstation",
    name: "Workstation",
    icon: "⚙️",
    brands: [
      {
        name: "HP",
        vendors: [
          v("Yugant Vashishth", "yugant.vashistha1@hp.com", "9718171390", "company_rep"),
          v("Hemant Dable", "hemant.dable@hp.com", "8939820400", "company_rep"),
          v("Tara Dutt (Savex)", "taradutt.gaur@savex.in", "9760903030"),
          v("Abhishek (Redington)", "abhishek.pundir@redingtongroup.com", "8950705420"),
          v("Anshul Sharma (Rashi)", "anshul.sharma@rptechindia.com", "7055112518"),
        ],
      },
      {
        name: "Dell",
        vendors: [
          v("Joshi Amrit", "amrit.joshi@dell.com", "9148363063", "company_rep"),
          v("Manish Bahuguna (Redington)", "manish.bahuguna@redingtongroup.com", "9358106096"),
          v("Vivek Aggarwal (Supertron)", "vivek.agarwal@supertronindia.com", "7579083080"),
          v("Vaibhav Jain (Enfotech)", "vaibhav@enfotechindia.com", "8368131343"),
        ],
      },
      {
        name: "Lenovo",
        vendors: [
          v("Naveen Jha", "njha2@lenovo.com", "8696902736", "company_rep"),
          v("Vijay (Savex)", "Vijaypal.chauhan@savex.in", "9897784267"),
          v("Anshul Sharma (Rashi)", "anshul.sharma@rptechindia.com", "7055112518"),
        ],
      },
      {
        name: "Acer",
        vendors: [
          v("Devendra Raghuvanshi", "devendra.raghuvanshi@acersales.net", "9927006713", "company_rep"),
          v("Vivek Aggarwal (Supertron)", "vivek.agarwal@supertronindia.com", "7579083080"),
        ],
      },
      {
        name: "Asus",
        vendors: [
          v("Rahul Kumar", "rahul_kumar@asus.com", "9758195827", "company_rep"),
          v("Inder Pal (Rashi)", "indarjeet.pal@rptechindia.com", "8791332216"),
          v("Atul (Supertron)", "atul.dun@supertronindia.com", "8941931954"),
        ],
      },
    ],
  },
  {
    id: "printer",
    name: "Printer",
    icon: "🖨️",
    brands: [
      {
        name: "HP",
        vendors: [
          v("Chiradeep Sen", "chiradeep.sen@hp.com", "8826007299", "company_rep"),
          v("Sumit Rawat (Savex)", "sumit.rawat@savex.in", "9557175124"),
          v("Priyanka (Microworld)", "Priyanka@microworldinfosol.com", "9560999114"),
        ],
      },
      {
        name: "Canon",
        vendors: [
          v("Shivanshu (A3)", "shivanshu.tyagi@canon.co.in", "7454971865", "company_rep"),
          v("Rahul Dixit", "rahul.dixit@canon.co.in", "9335515445", "company_rep"),
          v("Prakant Tyagi", "Prakant.TyagiTEMP@canon.co.in", "9634818772", "company_rep"),
          v("Neha (IT Zone)", "info@itzone.net.in", "9759432145"),
        ],
      },
      {
        name: "Epson",
        vendors: [
          v("Puneet", "Puneet@eid.epson.co.in", "9872475724", "company_rep"),
          v("Gaurav Pahwa", "gaurav.pahwa@eid.epson.co.in", "9634433099", "company_rep"),
          v("Satnam (JP Sales)", "Satnam@jpsales.net.in", "8755441375"),
        ],
      },
      {
        name: "Brother",
        vendors: [
          v("Subhash Uniyal", "Subhash.Uniyal@brother.in", "8006555513", "company_rep"),
        ],
      },
      {
        name: "Pantum",
        vendors: [
          v("Anuj Tyagi", "anuj.pantum@gmail.com", "7088852000", "company_rep"),
        ],
      },
      {
        name: "Konica Minolta",
        vendors: [
          v("Ankit Singh", "ankit.singh@konicaminolta.com", "9648233777", "company_rep"),
        ],
      },
    ],
  },
  {
    id: "scanner",
    name: "Scanner",
    icon: "📠",
    brands: [
      {
        name: "Canon",
        vendors: [
          v("Shivanshu (A3)", "shivanshu.tyagi@canon.co.in", "7454971865", "company_rep"),
        ],
      },
      {
        name: "Epson",
        vendors: [
          v("Puneet", "Puneet@eid.epson.co.in", "9872475724", "company_rep"),
        ],
      },
      {
        name: "HP",
        vendors: [
          v("Chiradeep Sen", "chiradeep.sen@hp.com", "8826007299", "company_rep"),
          v("Sumit Rawat (Savex)", "sumit.rawat@savex.in", "9557175124"),
          v("Priyanka (Microworld)", "Priyanka@microworldinfosol.com", "9560999114"),
        ],
      },
      {
        name: "Brother",
        vendors: [
          v("Subhash Uniyal", "Subhash.Uniyal@brother.in", "8006555513", "company_rep"),
        ],
      },
      {
        name: "Zebra",
        vendors: [
          v("Shiva Mehrotra (Ingram Micro)", "Shiva.Mehrotra@ingrammicro.com", "9711868363"),
          v("Santosh (S2 Infotech)", "santosh@s2infosystem.com", "9935300547"),
        ],
      },
      {
        name: "Honeywell",
        vendors: [
          v("Hardeep Singh Dadwal", "hardeep@impacthoneywell.com", "9897155454", "company_rep"),
        ],
      },
    ],
  },
  {
    id: "server",
    name: "Server & Storage",
    icon: "🗄️",
    brands: [
      {
        name: "Dell",
        vendors: [
          v("Joshi Amrit", "amrit.joshi@dell.com", "9148363063", "company_rep"),
          v("Rahul Kumar Mandal (Comnet)", "rahul@comnetit.com", "9899696143"),
          v("Gagan Dhawan (Ingram Micro)", "Gagan.Dhawan@ingrammicro.com", "9319218412"),
          v("Manisha Patel (KM & Co)", "manisha@kmnco.in", "9104647889"),
          v("Pradeep (Net Asia)", "Pardeep@netasiatechnologies.com", "9873351958"),
        ],
      },
      {
        name: "HPE",
        vendors: [
          v("Ashok Mishra", "ashok-kumar.mishra@hpe.com", "7897770123", "company_rep"),
          v("Renu (Intensity Global)", "sales1@igtpl.co.in", "971639090"),
          v("Madhu Dutta (Comnet)", "madhu@comnetit.com", "9899696121"),
        ],
      },
      {
        name: "Lenovo",
        vendors: [
          v("Gagan Deep", "gdeep@lenovo.com", "8283810229", "company_rep"),
          v("Rofsan Chaudhary (Savex)", "rofsan.chowdhary@savex.in", "8250848818"),
          v("Manish Bahuguna (Redington)", "manish.bahuguna@redingtongroup.com", "9358106096"),
          v("Dinesh Joshi (Sterling)", "dineshjoshi@sterlingmail.in", "7678677542"),
          v("Madhu Dutta (Comnet)", "madhu@comnetit.com", "9899696121"),
        ],
      },
      {
        name: "NetApp",
        vendors: [
          v("Aman Gupta", "aman.gupta@netapp.com", "8171939988", "company_rep"),
        ],
      },
      {
        name: "QNAP NAS",
        vendors: [
          v("Ali Shaikh (Chipcom)", "storage3@chipcom.in", "9372786240"),
        ],
      },
      {
        name: "Synology NAS",
        vendors: [
          v("Ali Shaikh (Chipcom)", "storage3@chipcom.in", "9372786240"),
          v("Kailash Singh (Supertron)", "kailash.dun@supertronindia.com", ""),
        ],
      },
      {
        name: "Microsoft Azure",
        vendors: [
          v("Samsun Nadar", "samson.nadar@savex.in", "9930961411", "company_rep"),
          v("Kapil Yadav (Savex)", "kapil.yadav@savex.in", "9977243733"),
        ],
      },
      {
        name: "AWS",
        vendors: [
          v("Simarjeet", "", "9888188868", "company_rep"),
          v("Vishal Singh (Redington)", "vishal.singh@redingtongroup.com", "7827357804"),
        ],
      },
    ],
  },
  {
    id: "switches",
    name: "Switches",
    icon: "🔌",
    brands: [
      {
        name: "Cisco",
        vendors: [
          v("Anudeep Parasar", "anudpara@cisco.com", "9958598485", "company_rep"),
          v("Mohd Haroon (Avion)", "haroon@avionnetwork.co.in", "8368277328"),
        ],
      },
      {
        name: "HPE Aruba",
        vendors: [
          v("Ashok Mishra", "ashok-kumar.mishra@hpe.com", "7897770123", "company_rep"),
          v("Kapil Yadav (Savex)", "kapil.yadav@savex.in", "9977243733"),
          v("Sharad Shukla (Intensity)", "sales4@igtpl.co.in", "9667747525"),
          v("Mohd Haroon (Avion)", "haroon@avionnetwork.co.in", "8368277328"),
          v("Hemant Srivastava (TechTune)", "hemant@techtunenet.com", "9220911318"),
        ],
      },
      {
        name: "D-Link",
        vendors: [
          v("Ashoke Panday", "ashok.pandey@in.dlink.com", "8853006660", "company_rep"),
          v("Ankur Jain (Jai Paras)", "mail@jaiparasinfotech.com", "9412052066"),
          v("Nisha (Spark India)", "nisha@sparkindia.com", "8826999253"),
          v("Hemant Srivastava (TechTune)", "hemant@techtunenet.com", "9220911318"),
        ],
      },
      {
        name: "TP-Link",
        vendors: [
          v("Akshay Singh", "akshay.singh@tp-link.com", "7972873135", "company_rep"),
          v("Balbir Singh (Best Computer)", "balbir_01@yahoo.com", "9837004383"),
          v("Hemant Srivastava (TechTune)", "hemant@techtunenet.com", "9220911318"),
        ],
      },
      {
        name: "Netgear",
        vendors: [
          v("Pawan Sharma", "pawan.kumar@netgear.com", "9888934411", "company_rep"),
        ],
      },
      {
        name: "Ruijie",
        vendors: [
          v("Pankaj", "Pankajkumar@ruijienetworks.com", "9811750404", "company_rep"),
        ],
      },
      {
        name: "DIGISOL",
        vendors: [
          v("Saurabh Rathor", "Saurabh.rathour@digisol.com", "9818347676", "company_rep"),
          v("Rahul Dwivedi", "rahuldwivedi530@gmail.com", "6397111763"),
          v("Chandra Prakash Rawat", "rawatcp@gmail.com", "9358142400"),
          v("Hemant Srivastava (TechTune)", "hemant@techtunenet.com", "9220911318"),
        ],
      },
    ],
  },
  {
    id: "cctv",
    name: "CCTV / Camera",
    icon: "📹",
    brands: [
      {
        name: "Hikvision",
        vendors: [
          v("Rohit Singh", "rohit.chand@pramahikvision.com", "9137579480", "company_rep"),
          v("Vaibhav Verma (Satya IT)", "satyaitquery@gmail.com", "8430861890"),
        ],
      },
      {
        name: "CP Plus",
        vendors: [
          v("Rahul Malik", "rahul_malik@adityagroup.com", "8860042029", "company_rep"),
          v("Mohit Rajput (All for Tech)", "delhi@foretechindia.com", "9756709081"),
        ],
      },
      {
        name: "Honeywell",
        vendors: [
          v("Arjun Pandey", "Anuj.pandey@honeywell.com", "8527038556", "company_rep"),
          v("Yogesh Negi", "yogesh.negi1@digimro.com", "8279443142"),
        ],
      },
      {
        name: "Sony",
        vendors: [
          v("Chetan Rawat", "Chetan.rawat@sony.com", "9639236000", "company_rep"),
          v("Aman (Sony India)", "Behl_associates@yahoo.co.in", "7417748539"),
        ],
      },
      {
        name: "Matrix (MII)",
        vendors: [
          v("Prabhakar Gupta", "prabhakar.gupta@matrixcomsec.com", "6392896760", "company_rep"),
        ],
      },
      {
        name: "TP-Link",
        vendors: [
          v("Akshay Singh", "akshay.singh@tp-link.com", "7972873135", "company_rep"),
          v("Nupur Gupta (Rashi)", "nupur.gupta@rptechindia.com", "7310999640"),
        ],
      },
      {
        name: "D-Link",
        vendors: [
          v("Ashoke Panday", "ashok.pandey@in.dlink.com", "8853006660", "company_rep"),
          v("Ankur Jain (Jai Paras)", "mail@jaiparasinfotech.com", "9412052066"),
        ],
      },
      {
        name: "Logitech",
        vendors: [
          v("Sandeep Pandey", "spandey2@logitech.com", "9358341213", "company_rep"),
          v("Sandeep (Supertron)", "Sandeep.dun@supertronindia.com", "7534012515"),
        ],
      },
      {
        name: "Dahua",
        vendors: [
          v("Mohit Rajput (All for Tech)", "delhi@foretechindia.com", "9756709081"),
          v("Vaibhav Verma (Satya IT)", "satyaitquery@gmail.com", "8430861890"),
        ],
      },
    ],
  },
  {
    id: "cable",
    name: "Cable",
    icon: "🔗",
    brands: [
      {
        name: "D-Link",
        vendors: [
          v("Ashoke Panday", "ashok.pandey@in.dlink.com", "8853006660", "company_rep"),
          v("Ankur Jain (Jai Paras)", "mail@jaiparasinfotech.com", "9412052066"),
          v("Nisha (Spark India)", "nisha@sparkindia.com", "8826999253"),
          v("Hemant Srivastava (TechTune)", "hemant@techtunenet.com", "9220911318"),
        ],
      },
      {
        name: "Polycab",
        vendors: [
          v("Arihant Jain (Arihant Ind.)", "arihantj.jain3@gmail.com", "8909645088"),
          v("Vinay Dhingra (Dhingra Elect.)", "dhingraelectricals@gmail.com", "9897324089"),
          v("Rahul Singh (Redington)", "singh.rahul@redingtongroup.com", ""),
        ],
      },
      {
        name: "Molex",
        vendors: [
          v("Keshav Gupta (Keshav Ent.)", "pankaj@keshavent.co.in", "8586900898"),
          v("Prashant (KHM Tech)", "sales2@khmtechnologies.com", "9810689278"),
          v("Sanya Chauhan (TC Infotech)", "sanya@tcinfotech.com", "8800140001"),
        ],
      },
      {
        name: "Commscope",
        vendors: [
          v("Himanshu Sharma", "Himanshu.Sharma@commscope.com", "7391045673", "company_rep"),
          v("Manish Bahuguna (Redington)", "manish.bahuguna@redingtongroup.com", "9358106096"),
          v("Keshav Gupta (Keshav Ent.)", "pankaj@keshavent.co.in", "8586900898"),
        ],
      },
      {
        name: "Finolex",
        vendors: [
          v("Telecom Goods Corp.", "telecomgoodscorporation@gmail.com", "9411105555"),
          v("Ankit Aggarwal (Manglam)", "mangalamsalesddn@gmail.com", "9639004150"),
        ],
      },
    ],
  },
  {
    id: "rack",
    name: "Rack",
    icon: "🏗️",
    brands: [
      {
        name: "D-Link",
        vendors: [
          v("Ashoke Panday", "ashok.pandey@in.dlink.com", "8853006660", "company_rep"),
          v("Ankur Jain (Jai Paras)", "mail@jaiparasinfotech.com", "9412052066"),
          v("Hemant Srivastava (TechTune)", "hemant@techtunenet.com", "9220911318"),
        ],
      },
      {
        name: "APC",
        vendors: [
          v("Dinesh Sharma", "Dinesh.Sharma@se.com", "8527633838", "company_rep"),
          v("Nupur Gupta (Rashi)", "nupur.gupta@rptechindia.com", "7310999640"),
          v("Laxman Bisht (Iris Global)", "laxman.bisht@irisglobal.in", "9897876014"),
          v("Hemant Srivastava (TechTune)", "hemant@techtunenet.com", "9220911318"),
        ],
      },
      {
        name: "Legrand",
        vendors: [
          v("Ritesh Sharma", "rimllu.bhushansharma@legrand.com", "9811316061", "company_rep"),
        ],
      },
      {
        name: "Netrack",
        vendors: [
          v("Surya Prakash Dixit (PV Lumens)", "surya.dixit@pvlumens.com", "7351320021"),
        ],
      },
    ],
  },
  {
    id: "storage",
    name: "Storage",
    icon: "💾",
    brands: [
      {
        name: "Seagate",
        vendors: [
          v("Vinoth Ramalingam", "vinoth.ramalingam@seagate.com", "9791018640", "company_rep"),
          v("Tinnu Ansari (Creative Comp.)", "tinnuansari1@gmail.com", "8273089360"),
          v("Mohd. Zafar (Rashi)", "mzafar@rptechindia.com", "7055112515"),
          v("Ali Shaikh (Chipcom)", "storage3@chipcom.in", "9372786240"),
        ],
      },
      {
        name: "WD",
        vendors: [
          v("Tinnu Ansari (Creative Comp.)", "tinnuansari1@gmail.com", "8273089360"),
          v("Ali Shaikh (Chipcom)", "storage3@chipcom.in", "9372786240"),
        ],
      },
      {
        name: "Samsung",
        vendors: [
          v("Vivek Aggarwal (Supertron)", "vivek.agarwal@supertronindia.com", "7579083080"),
          v("Deepak Jain (Shreepati)", "info@shreepati.in", "9811588834"),
          v("Tinnu Ansari (Creative Comp.)", "tinnuansari1@gmail.com", "8273089360"),
        ],
      },
      {
        name: "Kingston",
        vendors: [
          v("Deepak Jain (Shreepati)", "info@shreepati.in", "9811588834"),
          v("Ali Shaikh (Chipcom)", "storage3@chipcom.in", "9372786240"),
          v("Balbir Singh (Best Computer)", "balbir_01@yahoo.com", "9837004383"),
        ],
      },
    ],
  },
  {
    id: "ups",
    name: "UPS",
    icon: "🔋",
    brands: [
      {
        name: "APC",
        vendors: [
          v("Dinesh Sharma", "Dinesh.Sharma@se.com", "8527633838", "company_rep"),
          v("Nupur Gupta (Rashi)", "nupur.gupta@rptechindia.com", "7310999640"),
          v("Laxman Bisht (Iris Global)", "laxman.bisht@irisglobal.in", "9897876014"),
        ],
      },
      {
        name: "Vertiv (Emerson)",
        vendors: [
          v("Gaurav Rathore", "Gaurav.Rathore@Vertiv.com", "9873737346", "company_rep"),
        ],
      },
      {
        name: "Numeric",
        vendors: [
          v("Gaurav Bajaj", "gaurav.bajaj@Legrand.co.in", "9910009746", "company_rep"),
        ],
      },
    ],
  },
  {
    id: "projectors",
    name: "Projectors",
    icon: "📽️",
    brands: [
      {
        name: "Epson",
        vendors: [
          v("Nitin Khandelwal (Laxmi Agencies)", "nitin@laxmiagencies.com", "9837059995"),
          v("Nadan Das (Laxmi Agencies)", "sales@laxmiagencies.com", "7351459995"),
        ],
      },
      {
        name: "Sony",
        vendors: [
          v("Nitin Khandelwal (Laxmi Agencies)", "nitin@laxmiagencies.com", "9837059995"),
        ],
      },
      {
        name: "LG",
        vendors: [
          v("Kushagra Rastogi", "kushagra.rastogi@lge.com", "9873334182", "company_rep"),
        ],
      },
      {
        name: "Panasonic",
        vendors: [
          v("Bhavya Arora", "bhavya.arora@in.panasonic.com", "9540298253", "company_rep"),
        ],
      },
    ],
  },
  {
    id: "flat-panel",
    name: "Flat Panel",
    icon: "📺",
    brands: [
      {
        name: "Hikvision",
        vendors: [
          v("Rahul Jalan", "rahul.jalan@pramahikvision.com", "9650409911", "company_rep"),
        ],
      },
      {
        name: "BenQ",
        vendors: [
          v("Avinash Kumar", "Avinash.Kumar@BenQ.com", "9761771311", "company_rep"),
        ],
      },
      {
        name: "ViewSonic",
        vendors: [
          v("Amritesh Goswami", "amitesh.goswami@viewsonic.com", "9559924020", "company_rep"),
          v("Taiyab (ViewSonic)", "taiyab.azami@viewsonic.com", "8283809692"),
        ],
      },
      {
        name: "Delta",
        vendors: [
          v("Amit Kumar", "V-amit.k@deltaww.com", "9565900707", "company_rep"),
          v("Pradeep (Alliance)", "pradeep.singh@alliancedigitech.com", "9997144554"),
        ],
      },
    ],
  },
  {
    id: "software",
    name: "Software",
    icon: "💿",
    brands: [
      {
        name: "Microsoft",
        vendors: [
          v("Amarjeet Bagga (Redington)", "amarjeet.bagga@redingtongroup.com", "9176606843"),
          v("Ateesh Shrivastava (Redington)", "ateesh.sri@redingtongroup.com", "7982586871"),
        ],
      },
      {
        name: "AutoCAD",
        vendors: [
          v("Jaspreet Singh", "jaspreet.chana@redingtongroup.com", "9023025637", "company_rep"),
        ],
      },
      {
        name: "Trend Micro",
        vendors: [
          v("Kanchan Chadha", "kanchan_chadha@trendmicro.com", "9811800881", "company_rep"),
        ],
      },
      {
        name: "Seqrite",
        vendors: [
          v("Prabal Dubey", "Dubey-prabal.dubey@seqrite.com", "9305254445", "company_rep"),
        ],
      },
      {
        name: "Veritas",
        vendors: [
          v("Sonali Bhavasar (Technofirm)", "sonali@technofirmsoftware.com", "9328822800"),
          v("Alok (Softmart)", "alok@softmartonline.com", "9811047516"),
          v("Roopa Sanghavi (Technofirm)", "roopa@technofirm.in", "9377722800"),
        ],
      },
      {
        name: "Adobe",
        vendors: [
          v("Sonali Bhavasar (Technofirm)", "sonali@technofirmsoftware.com", "9328822800"),
          v("Alok (Softmart)", "alok@softmartonline.com", "9811047516"),
        ],
      },
    ],
  },
  {
    id: "vc-setup",
    name: "VC Setup",
    icon: "🎥",
    brands: [
      {
        name: "Logitech",
        vendors: [
          v("Sandeep Pandey", "spandey2@logitech.com", "9358341213", "company_rep"),
          v("Sandeep (Supertron)", "Sandeep.dun@supertronindia.com", "7534012515"),
        ],
      },
      {
        name: "Zoapi",
        vendors: [
          v("Harsh Tiwari", "harsh@zoapi.com", "9606767098", "company_rep"),
        ],
      },
    ],
  },
  {
    id: "led-video-wall",
    name: "LED Video Wall",
    icon: "🖼️",
    brands: [
      {
        name: "Hikvision",
        vendors: [
          v("Rahul Jalan", "rahul.jalan@pramahikvision.com", "9650409911", "company_rep"),
          v("Rohit Chand (Prama)", "rohit.chand@pramahikvision.com", "9137579480"),
        ],
      },
      {
        name: "Panasonic",
        vendors: [
          v("Deepanshu Ahuja", "deepanshu.ahuja@in.panasonic.com", "9811469796", "company_rep"),
          v("Surbhi Sharma", "surbhisharma4106@gmail.com", "9810554515"),
        ],
      },
      {
        name: "AET",
        vendors: [
          v("Satyam Pandey", "satyam@aetdisplays.com", "9956399504", "company_rep"),
        ],
      },
    ],
  },
  {
    id: "boom-barrier",
    name: "Boom Barrier",
    icon: "🚧",
    brands: [
      {
        name: "eSSL",
        vendors: [
          v("Sumit", "sumit@esslsecurity.com", "9483522212", "company_rep"),
        ],
      },
      {
        name: "Speedgatz",
        vendors: [
          v("Saumitra Shekhar", "saumitra@speedgatz.com", "8527320054", "company_rep"),
        ],
      },
    ],
  },
  {
    id: "pa-system",
    name: "PA System",
    icon: "🔊",
    brands: [
      {
        name: "Hikvision",
        vendors: [
          v("Rahul Jalan", "rahul.jalan@pramahikvision.com", "9650409911", "company_rep"),
          v("Rohit Chand (Prama)", "rohit.chand@pramahikvision.com", "9137579480"),
        ],
      },
      {
        name: "Ahuja",
        vendors: [
          v("Amar Singh Bisht", "arihant.infocom@gmail.com", "9891981198", "company_rep"),
        ],
      },
    ],
  },
  {
    id: "wifi",
    name: "WiFi / Access Point",
    icon: "📶",
    brands: [
      {
        name: "Cisco",
        vendors: [
          v("Anudeep Parasar", "anudpara@cisco.com", "9958598485", "company_rep"),
          v("Manish Bahuguna (Redington)", "manish.bahuguna@redingtongroup.com", "9358106096"),
          v("Mohd Haroon (Avion)", "haroon@avionnetwork.co.in", "8368277328"),
          v("Hemant Srivastava (TechTune)", "hemant@techtunenet.com", "9220911318"),
        ],
      },
      {
        name: "HPE Aruba",
        vendors: [
          v("Ashok Mishra", "ashok-kumar.mishra@hpe.com", "7897770123", "company_rep"),
          v("Renu Chauhan (Intensity)", "sales1@igtpl.co.in", "9716139090"),
          v("Mohd Haroon (Avion)", "haroon@avionnetwork.co.in", "8368277328"),
        ],
      },
      {
        name: "Ruckus",
        vendors: [
          v("Nitin Mittal", "Nitin.Mittal@commscope.com", "9356922179", "company_rep"),
          v("Kirtikumar Patil (Redington)", "Kirtikumar.patil@redingtongroup.com", "9373979605"),
          v("Keshav Gupta (Keshav Ent.)", "sales@keshavent.co.in", "8586900898"),
          v("Hemant Srivastava (TechTune)", "hemant@techtunenet.com", "9220911318"),
        ],
      },
      {
        name: "D-Link",
        vendors: [
          v("Ashoke Panday", "ashok.pandey@in.dlink.com", "8853006660", "company_rep"),
          v("Ankur Jain (Jai Paras)", "mail@jaiparasinfotech.com", "9412052066"),
        ],
      },
    ],
  },
];
