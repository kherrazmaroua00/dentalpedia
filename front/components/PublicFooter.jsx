export default function PublicFooter() {
  return (
    <footer className="max-w-[1200px] mx-auto mt-16 mb-8 backdrop-blur-sm rounded-[28px] border border-violet-200 px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm shadow-[0_10px_40px_rgba(125,93,255,0.04)]">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-gray-800">Dentalpedia</span>
        </div>
        <p className="text-gray-500 text-xs leading-relaxed">
          Un espace proposé par les étudiants pour partager et découvrir des ressources d'études dentaires.
        </p>
      </div>

      <div>
        <p className="font-semibold text-gray-800 mb-2">Vous avez une ressource à partager ?</p>
        <p className="text-gray-500 text-xs mb-4">Aidez vos pairs en contribuant à notre bibliothèque grandissante.</p>
        <a
          href="mailto:chahinezbenkeltoum20@gmail.com"
          className="inline-block bg-violet-500 hover:bg-violet-600 text-white text-xs font-medium px-4 py-2.5 rounded-xl transition"
        >
          Contacter l'Admin
        </a>
      </div>

      <div>
        <p className="font-semibold text-gray-800 mb-2">Fait avec soin</p>
        <p className="text-gray-500 text-xs mb-4">Développé par Maroua pour soutenir la communauté dentaire.</p>
        <div className="flex gap-3">
          <a
            href="https://www.linkedin.com/in/kherraz-maroua-9b30822a1/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-violet-50 flex items-center justify-center hover:bg-violet-100 transition"
            aria-label="LinkedIn"
          >
            <img src="/linkedin.svg" alt="LinkedIn" className="w-14 h-14" />
          </a>
          <a
            href="https://github.com/kherrazmaroua00"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition"
            aria-label="GitHub"
          >
            <img src="/github.svg" alt="GitHub" className="w-14 h-14" />
          </a>
        </div>
      </div>
    </footer>
  );
}