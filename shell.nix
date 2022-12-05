{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs-18_x  ## NodeJS (v18) https://nodejs.org/en/download/
    docker ## Docker cli https://docs.docker.com/get-docker/
  ];

  shellHook = ''
    echo Execution environment for Overlays-CLI
  '';

}
