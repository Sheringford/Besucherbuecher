
import { DiaryDocument } from './types';

// Helper to generate mock XML for the example documents
const generateXml = (page: number, content: string) => `
<TEI>
  <text>
    <body>
      <div type="page" n="${page}">
        <head>Visitor Log - Page ${page}</head>
        <p>${content}</p>
        <list>
            <item><name>Sir Arthur Conan Doyle</name> <date>May 12th</date> - <note>Seeking inspiration.</note></item>
            <item><name>Mrs. Hudson</name> <date>May 12th</date> - <note>Accompanying above.</note></item>
            <item><name>Oscar Wilde</name> <date>May 14th</date> - <note>Remarked on the decor.</note></item>
        </list>
        <p>The weather was particularly dreary this week, resulting in fewer patrons than usual.</p>
      </div>
    </body>
  </text>
</TEI>
`;

const besucherbuchPage1 = `
<transcription>
  <text><![CDATA[
<pb n="1" source="0014.jpg" />
Nomina Illustrium
Qui Bibliothecam Regio⸗Electoralem
Dresdensem inviserunt.

Marquis de Sylva Sereniss. Lusitaniæ Regis ad
Aulam Neapolitanam Legatus.
Fridericus Moszynski Comt (sig) 1. Jul 1753.
Gundaccarus Comes de Sternberg. 3. Jul. 1753.
Adolphus Erasmus a Gersdorff. d. 3. Jul: 1753.
Johann Friedrich Ernst von Braue 27. Jul. 1753.
Dñ Francisco d’Echavarria capitan al
Servicio d’espeña —
Stephanus de Halmágy Hungarus ex Tramia d. 13a Julÿ. 1753.
Dñ Jph Manes. Capitan al servicio d’España —
Henri Maurice de Berlepsch. z 3 Julli 1753.
Poniatowicz Colonel dans l’Armée de Pologne.
Johann Ernst von Zweÿdorff Königl: Page den 30 Jul: 1753
Francisc[us] Borouski Præposit. Cracp.
Philippe Bourekhard de Leger Capitain le 3. Aout. 1753.
Louis de Bachelu Lieutenant Colonel „ „ „ „
Jean Baptiste Burekhard de Leger Capitain
L’abé de Leger Bachelier de Sorbone. le 3. Aout 1753.
Dñ Philipe de Larrea dela Province de Bizcaye, en Espagne d. 6. A.
Christophorꝰ Guilielmꝰ de Waldstromer. Noribergensis.
Paulus de Stetter. Augustanus
J. Martin Walter Major Jng: den 10ten Augst. 1753.
Pierre michel hennin Secretaire attaché a l’ambassade de france en Pologne 1753
Wolf Christian v. Schönberg Kriegs Rath. d. 11 Augst 1753.
Johannes Ernestus Gottlieb Koch. Syndicꝰ Stolberg:
d. 11t Augst 1753
Johannes Jacobus Spörl ex Norimberga d. 15. Augt 1753
  ]]></text>
</transcription>`;

const besucherbuchPage2 = `
<transcription>
  <text><![CDATA[
<pb n="2" source="0015.jpg" />
2.
August Hartmann von Pistoris. Capitaine
d. 28. aug: 1753.
Evald Ribe Nobilis Svecus d 30 Aug: 1753
Christoffer von Kothen Liber Baro
Svecus d. 1. Sept: 1753.
Magnus von Fardemein Lieutenant. d 1 Sept: 1753.
Suecus.
Strawinski Nobil Polonus
RPk. 3 Septembris
Florainy Cunucus Regius Polonus Nobilis.
1753
d. 11. Sept: 1753. Chretien Comte de Sternberg Chambellan Impl.
Bernard Bellotto detto Canaleto
Lorenzo Bellotto detto Canaletto } Italiani
George, Conrad Walthern
Sep: 12, 1753 Mons⸗r L. R. Iremonger, } Cavalier Anglois.
Sep: 12, 1753 Mons⸗r B. Lethieullier Cavalier Anglois.
lier Anglois.
Valentin Sobolewski
gentil-homme de la Chambre.
Sept: 15. 1753 Magister Watson } Regismont: Boruss:
Magister Werner
Sept: 18. 1753. H. Kronifilds. Mariæb Bl. Do
C Guntheri Gedanensis
C. G Baum gartner.
Octob. 3: 1753. Andreas Jonas Corber Waraljensis
Hungarus.
Octobr. 4. 1753. Samuel Fridericus Krokisius Mariaeb⸗Polono⸗Boruss.
Iohann Iulianus Kipperger Albrechts
franck
d. 5. Octobr. 1753. Comtes Mqis de Menefoglio Italien
d. 10 Octobr. 1753 Johann Jacob Thoelden. Sangerhusa⸗Thuring.
Eod: die et anno Johannes Christianꝰ Gottlieb Roemer. Magdeburg: Misnicus.
  ]]></text>
</transcription>`;

const besucherbuchPage3 = `
<transcription>
  <text><![CDATA[
<pb n="3" source="0016.jpg" />
Alexis. Ch.r de Duhamel
Major dans les gardes à cheval.
3.
30 Aug
Baro
Françoise Droüet.
Eucharius Carl Friedrich von Glahnÿ.
1 Sep. Allesina
Crivelli Italiani d. 24. Oct. 1753.
Bellavite
Luitzen
Friedricus Alexander Comes de Gersdorff. 30. Oct. 1753.
Johannes Mauritius Adolphus Comes de Bruhl. 15. Nov. 1753.
Franciscus Wilhelmus Klingerfus presbyter argentoratensis
Frid. Melch. Grimm Ratispon. Secret. du Comte de Frise.
Joan. Fr. Rost. Secrt. d’ambassade à la cour de Munic.
Fred: Mag: Saul, Secrt. d’ambassade à Turin.
Carl Frid: Thiensondt
C. L. a Furstenberger Patric. bernensis 1754.
Dan: Studer V. D. M. Bernas.
Judt. El. Wustemann.
Antonius Unger Eub. Toplicÿ
Bohuslaus Hoczitta Med: Doctor Töplizÿ
Johann Frank Huber Kaysl. Controleur in Zÿglitz.
Bor H. Carl Otto Gleichmann Dresdensis.
Bl. Johann Heinrich Blell. Brunsuic:
M. Gottlob Ehrenfried Fischetus, Colo⸗Misn: Diac: Altleiss
Simon Kiehl. Civis Borussiensis.
Wolfgang Benjamin von Lüttichau
Friderich Winckler. D. lips.
Carl Christian Krauss Phil. et Med. D. Delitianus.
Polon. Bonardi Docteur en Medecine. piemontois de nation
re olh Lafon fils
fin Ital Gustav Peter Hempel Studiosus Medicinæ aus Copenhg
Augustus Gottlob Silligius } Secretaires de la Chambre des ..
Misnic. Gottlieb August Schumann
  ]]></text>
</transcription>`;

const besucherbuchPage4 = `
<transcription>
  <text><![CDATA[
<pb n="4" source="0017.jpg" />
4.
Samuel Türi de Szánt Wessöd Transylv. H.
Cornet Ihmann. Dresdensis. 1754 14ma May
Johann Ernst Schneider, aus Stralsund in Pommern. d 20t May
Josephus Bentzur Hungarus. die 20. Maii A. 175
Jacob Martin Protzeÿ uber Baro Sveius.
J. P. franquell, Campes Celebres par Cit:
Peter Caligari ruß Ittalien Com:
Jo. Valentin Zehner D. et Archi⸗Diac: Silesiacg.
Johann Heinrich Graf von Beyernperg.
Christian selig Weigde.
Tho Brand Anglois
B Fowler Anglois
MDCCLIV. M. Roeczel, Tharamont. Lips.
Samuel Loick Gen. Accis Bau Director
Christian Friedrich Roßmann
Luigi Franceschini
Francesco Rizieri
De Moulines, Pasteur françois à Berlin
De Laflechére Lieut: dans les Suisses au Service d’hollande
Henricus Christianus Baro de Senckenberg. Consilia
Imperii Aulicus.
Charles Frederic de Gaertner, Consiliarius Aulicus.
S. Theodorus Chladenius Physic: Haynensis.
Joseph Jonas Müller Rabiner von Friedberg
Christoff Siegmund Schumacher, Ephemeridograph.
Johann Ludwig Klingsohr
Ernst Phillipp Weinmar
  ]]></text>
</transcription>`;

const besucherbuchPage5 = `
<transcription>
  <text><![CDATA[
<pb n="5" source="0018.tif.original.jpg" />
5.
Johann Gottlieb Friedrich von Blacheÿ.
Kindelys Christian Friedrich Blacheÿ,
Bernardus de Rubeis Romanus
Johann August Ernst Ed. Secret. de Legation en Hollande
Joannes Antonius Baroy Nuncii Apostolici Cappellanus
Petrus Marinoni Nuncij Apostolici Secretarius
Vincenzo Gaudio, Professore di Giurisprudenza in Napoli.
Andreas Berdtko, Schemnitzio⸗Hungarus, SS. Theol. Stud.
Petrus Cardona Philosophiæ et Medicinæ Doctor Mediolanensis.
Michael Taube. Commission Rath.
Frederic le Bert de Bar Capitaines.
Ernst Johann Schmid Lieunt: } dans le Regiment de S. Altesse
Henrich Kwingenberg } Royale le Prince Xavier
Basile Vermeille
Anselme Polty } Chanoines reguliers Premontrés de Pragu
Charles Hladik
Joh: Moritz Lienbaum Capit: und Obr Feuerwerck Mstr.
Johann Christoph Kehrisch, Maj: des Ingens. d. 23tn Augst. 175
Ludw. Ehregott Schön Stud. Theol.
Joannes Dufay } J. U. D. gallus. Medicinæ Doctor.
Joannes Cherny } French. Hungarus h.t. Stud. Wittenb.
Joh: Gottl: Gottstein Stud: Med: von Thorn in Preuß.
Peter Bentzmann von Danzic
And. Bentzmann von Danzic
Johann David Frösche, Theolog. Stud.
Thomas Rigge Anglus
Ehrenfried Carl August Zwerner.
Le Prince De Jablonowski
De Reseville Page bie Sr Exceldenz Churs Prinz
Georgius Adam Sinold.
  ]]></text>
</transcription>`;

export const MOCK_DIARIES: DiaryDocument[] = [
  {
    id: 'besucherbuch-1753',
    title: 'Besucherbuch 1753-1813',
    dateRange: '1753 - 1813',
    description: 'Visitor diary containing signatures of notable figures from the mid-18th to early 19th century.',
    coverImage: './images/0014.jpg',
    pageCount: 5,
    pages: [
      {
        id: 'p-1',
        pageNumber: 1,
        imageUrl: './images/0014.jpg',
        transcriptionXml: besucherbuchPage1
      },
      {
        id: 'p-2',
        pageNumber: 2,
        imageUrl: './images/0015.jpg',
        transcriptionXml: besucherbuchPage2
      },
      {
        id: 'p-3',
        pageNumber: 3,
        imageUrl: './images/0016.jpg',
        transcriptionXml: besucherbuchPage3
      },
      {
        id: 'p-4',
        pageNumber: 4,
        imageUrl: './images/0017.jpg',
        transcriptionXml: besucherbuchPage4
      },
      {
        id: 'p-5',
        pageNumber: 5,
        imageUrl: './images/0018.tif.original.jpg',
        transcriptionXml: besucherbuchPage5
      }
    ]
  },
  {
    id: 'diary-1890',
    title: 'Library Visitor Register 1890-1892',
    dateRange: '1890 - 1892',
    description: 'The primary register for the main reading room during the late Victorian era. Contains signatures of notable literary figures.',
    coverImage: 'https://picsum.photos/id/24/800/600',
    pageCount: 120,
    pages: Array.from({ length: 10 }).map((_, i) => ({
      id: `p-${i + 1}`,
      pageNumber: i + 1,
      imageUrl: `https://picsum.photos/id/${i + 100}/1200/1600`,
      transcriptionXml: generateXml(i + 1, "The ink on this page is slightly faded due to water damage from the 1893 leak.")
    }))
  },
  {
    id: 'diary-1910',
    title: 'Curator\'s Private Journal 1910',
    dateRange: '1910',
    description: 'Personal observations of the head curator regarding the expansion of the East Wing.',
    coverImage: 'https://picsum.photos/id/20/800/600',
    pageCount: 45,
    pages: Array.from({ length: 5 }).map((_, i) => ({
      id: `p-${i + 1}`,
      pageNumber: i + 1,
      imageUrl: `https://picsum.photos/id/${i + 110}/1200/1600`,
      transcriptionXml: generateXml(i + 1, "Renovations are proceeding according to schedule, though the noise is unbearable.")
    }))
  }
];
