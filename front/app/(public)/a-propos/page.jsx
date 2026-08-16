export default function AProposPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 md:py-20">
      <div className="bg-white/60 border border-violet-100 rounded-[28px] p-8 md:p-12 shadow-[0_18px_50px_rgba(125,93,255,0.06)]">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-violet-700 uppercase mb-4">
          À propos
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
          Dentalpedia, une bibliothèque made by students
        </h1>

        <div className="space-y-5 text-base md:text-lg leading-8 text-slate-600">
          <p>
            Dentalpedia est une plateforme éducative pensée pour les étudiants en médecine dentaire.
            Son objectif est simple : centraliser les meilleurs supports, cours, fiches et ressources
            pédagogiques afin de rendre l’apprentissage plus clair, plus accessible et plus collaboratif.
          </p>

          <p>
            Ici, chaque année d’étude est organisée pour que vous puissiez retrouver rapidement les
            contenus utiles à votre progression, sans perdre de temps à chercher dans plusieurs sources.
          </p>

          <p>
            La plateforme est dirigée par <span className="font-semibold text-violet-700">Maroua</span>,
            la responsable de la structure et de l’animation du projet, avec une volonté forte de soutenir
            la communauté dentaire et de faire circuler les connaissances entre étudiants.
          </p>

          <p>
            Si vous avez des ressources utiles, des cours, des résumés, des documents ou des vidéos à partager,
            vous pouvez contribuer à enrichir la bibliothèque et aider les autres étudiants à progresser.
            Ensemble, on construit une base de savoir plus solide et plus utile pour tous.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <a
            href="mailto:chahinezbenkeltoum20@gmail.com"
            className="inline-flex items-center justify-center bg-violet-700 hover:bg-violet-800 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            Contacter l’admin
          </a>

          <a
            href="/"
            className="inline-flex items-center justify-center border border-violet-200 text-violet-700 hover:bg-violet-50 font-semibold px-6 py-3 rounded-xl transition"
          >
            Découvrir les ressources
          </a>
        </div>
      </div>
    </div>
  );
}