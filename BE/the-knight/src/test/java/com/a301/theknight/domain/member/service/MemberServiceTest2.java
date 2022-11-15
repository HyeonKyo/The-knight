package com.a301.theknight.domain.member.service;

import com.a301.theknight.domain.member.dto.MemberHistoryResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MemberServiceTest2 {
    @Autowired
    MemberService memberService;

    @Test
    void historyTest(){
        long memberId = 98L;
        MemberHistoryResponse response = memberService.getMemberHistory(memberId);

        System.out.println(response.toString());
    }
}
