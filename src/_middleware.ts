// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   // Récupérer le token depuis les cookies
//   const token = request.cookies.get('token')?.value

//   // Obtenir le chemin de la requête
//   const path = request.nextUrl.pathname

//   // Les chemins publics qui ne nécessitent pas d'authentification
//   const publicPaths = ['/signin', '/signup']

//   // Vérifier si l'utilisateur essaie d'accéder à une page publique
//   const isPublicPath = publicPaths.includes(path)

//   // Si l'utilisateur n'a pas de token et essaie d'accéder à une page protégée
//   if (!token && !isPublicPath) {
//     return NextResponse.redirect(new URL('/signin', request.url))
//   }

//   // Si l'utilisateur a un token et essaie d'accéder aux pages de connexion/inscription
//   if (token && isPublicPath) {
//     return NextResponse.redirect(new URL('/', request.url))
//   }

//   return NextResponse.next()
// }

// // Configurer les chemins sur lesquels le middleware doit s'exécuter
// export const config = {
//   matcher: [
//     /*
//      * Match all routes except:
//      * 1. /api routes
//      * 2. /_next (Next.js internals)
//      * 3. /_static (inside /public)
//      * 4. all files inside /public (e.g. favicon.ico)
//      */
//     '/((?!api|_next|_static|.*\\..*).*)'
//   ]
// }