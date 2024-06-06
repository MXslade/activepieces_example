
    import { createPiece, PieceAuth } from "@activepieces/pieces-framework";
    
    export const whatever = createPiece({
      displayName: "Whatever",
      auth: PieceAuth.None(),
      minimumSupportedRelease: '0.20.0',
      logoUrl: "https://cdn.activepieces.com/pieces/whatever.png",
      authors: [],
      actions: [],
      triggers: [],
    });
    