package com.a301.theknight.domain.member.dto;

import lombok.Data;

@Data
public class MemberInfoResponse {
    private String nickname;
    private String image;
    private int ranking;
    private int score;
    private int win;
    private int lose;
}
