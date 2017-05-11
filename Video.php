<?php
    class Video {
        private $id,
                $title,
                $desc,
                $posted,
                $length,
                $reddit;

        function __construct($vId, $vTitle, $vDesc, $lngth, $pst, $redd) {
            $this->id = $vId;
            $this->title = $vTitle;
            $this->desc = $vDesc;
            $this->length = $lngth;
            $this->posted = $pst;
            $this->reddit = $redd;
        }

        function getCard() {
            $result = '<div class="card">';
                $result .= "<h1><a href='".$this->getLink()."' target='_blank'>$this->title</a></h1>";
                $result .= "<span class='length'>".$this->getLength()."</span>";
                $result .= "<span class='desc'>$this->desc</span>";
                $result .= "<div class='thumb'><a href='".$this->getLink()."' target='_blank'><img src='".$this->getThumbnail()."' alt='thumbnail'></a></div>";
                if($this->reddit != -1)
                    $result .= "<div class='reddit'><a href='".$this->reddit."' target='_blank'><img src='img/snoo.png'></a></div>";
            $result .= '</div>';
            return $result;
        }

        function getLength() {
            return $this->length;
        }

        function getThumbnail() {
            return "https://i.ytimg.com/vi/$this->id/hqdefault.jpg";
        }

        function getLink() {
            return "https://www.youtube.com/watch?v=$this->id";
        }
    }
?>